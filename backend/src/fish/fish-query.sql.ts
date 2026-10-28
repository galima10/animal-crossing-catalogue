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
      WHERE mra.fish_id = fi.id
        AND mra.hemisphere = ${hemisphere}::"Hemisphere"
      GROUP BY mra.month
    ) grouped
  ), '[]'::jsonb)
`;

export const fishSelect = Prisma.sql`
  SELECT
    fi.id,
    fi.name,
    fi.image_url AS "imageUrl",
    fi.selling_price AS "sellingPrice",
    spl.name AS "seaPlaceName"
  FROM fishs fi
  LEFT JOIN sea_places spl ON spl.id = fi.sea_place_id
`;

export const fishDetails = Prisma.sql`
  SELECT
    fi.id,
    fi.name,
    fi.image_url AS "imageUrl",
    fi.selling_price AS "sellingPrice",
    spl.name AS "seaPlaceName",
    jsonb_build_object(
      'north', ${monthRangesByHemisphere('NORTH')},
      'south', ${monthRangesByHemisphere('SOUTH')}
    ) AS "monthRangesApparition"
  FROM fishs fi
  LEFT JOIN sea_places spl ON spl.id = fi.sea_place_id
`;

export const countQuery = (search: Prisma.Sql) => Prisma.sql`
  SELECT COUNT(*)::int AS total
  FROM fishs fi
  LEFT JOIN sea_places spl ON spl.id = fi.sea_place_id
  ${search}
`;
