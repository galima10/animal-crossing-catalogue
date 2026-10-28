import { Prisma } from '@prisma/client';

const monthRangesByHemisphere = (
  hemisphere: 'NORTH' | 'SOUTH',
) => Prisma.sql`
  COALESCE((
    SELECT jsonb_agg(
      jsonb_build_object(
        'month', grouped.month,
        'ranges', grouped.ranges,
        'isAllDay', grouped.is_all_day
      )
      ORDER BY grouped.month
    )
    FROM (
      SELECT
        mra.month,
        bool_or(mra.is_all_day) AS is_all_day,
        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'startHour', mra.start_hour,
              'endHour', mra.end_hour
            )
            ORDER BY mra.start_hour
          ) FILTER (
            WHERE mra.start_hour IS NOT NULL
              AND mra.end_hour IS NOT NULL
          ),
          '[]'::jsonb
        ) AS ranges
      FROM month_range_apparitions mra
      WHERE mra.insect_id = i.id
        AND mra.hemisphere = ${hemisphere}::"Hemisphere"
      GROUP BY mra.month
    ) grouped
  ), '[]'::jsonb)
`;

export const insectSelect = Prisma.sql`
  SELECT
    i.id,
    i.name,
    i.image_url AS "imageUrl",
    i.selling_price AS "sellingPrice",
    il.name AS "insectLocationName",
    jsonb_build_object(
      'north', ${monthRangesByHemisphere('NORTH')},
      'south', ${monthRangesByHemisphere('SOUTH')}
    ) AS "monthRangesApparition"
  FROM insects i
  LEFT JOIN insect_locations il ON il.id = i.insect_location_id
`;

export const countQuery = (search: Prisma.Sql) => Prisma.sql`
  SELECT COUNT(*)::int AS total
  FROM insects i
  LEFT JOIN insect_locations il ON il.id = i.insect_location_id
  ${search}
`;