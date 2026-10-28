import { Prisma } from '@prisma/client';

const monthRangesByHemisphere = (hemisphere: 'NORTH' | 'SOUTH') => Prisma.sql`
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
      WHERE mra.sea_creature_id = sc.id
        AND mra.hemisphere = ${hemisphere}::"Hemisphere"
      GROUP BY mra.month
    ) grouped
  ), '[]'::jsonb)
`;

export const seaCreatureSelect = Prisma.sql`
  SELECT
    sc.id,
    sc.name,
    sc.image_url AS "imageUrl",
    sc.selling_price AS "sellingPrice"
  FROM sea_creatures sc
`;

export const seaCreatureDetails = Prisma.sql`
  SELECT
    sc.id,
    sc.name,
    sc.image_url AS "imageUrl",
    sc.selling_price AS "sellingPrice",
    jsonb_build_object(
      'north', ${monthRangesByHemisphere('NORTH')},
      'south', ${monthRangesByHemisphere('SOUTH')}
    ) AS "monthRangesApparition"
  FROM sea_creatures sc
`;

export const countQuery = (search: Prisma.Sql) => Prisma.sql`
  SELECT COUNT(*)::int AS total
  FROM sea_creatures sc
  ${search}
`;
