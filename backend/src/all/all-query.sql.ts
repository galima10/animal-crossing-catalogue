import { Prisma } from '@prisma/client';

export const allSelect = Prisma.sql`
    WITH all_items AS (
        SELECT
            'villagers' AS "table",
            vi.id,
            vi.name,
            vi.image_url AS "imageUrl",
            NULL AS "buyingPrice",
            NULL AS "sellingPrice",
            vi.birthday,
            vi.gender,
            sps.name AS "speciesName",
            p.name AS "personalityName",
            NULL AS "category",
            NULL AS "variationNames",
            NULL AS "insectLocationName",
            NULL AS "weather",
            NULL AS "seaPlaceName"
        FROM villagers vi
        LEFT JOIN species sps ON sps.id = vi.species_id
        LEFT JOIN personalities p ON p.id = vi.personality_id

        UNION ALL

        SELECT
            'furnitures' AS "table",
            fu.id,
            fu.name,
            fu.image_url AS "imageUrl",
            fu.buying_price AS "buyingPrice",
            fu.selling_price AS "sellingPrice",
            NULL AS "birthday",
            NULL AS "gender",
            NULL AS "speciesName",
            NULL AS "personalityName",
            fu.category::text AS "category",
            COALESCE((
                SELECT
                    string_agg(
                        DISTINCT va.variation_name,
                        ', ' ORDER BY va.variation_name
                    )
                FROM variations va
                WHERE va.furniture_id = fu.id
            ), '') AS variationNames,
            NULL AS "insectLocationName",
            NULL AS "weather",
            NULL AS "seaPlaceName"
        FROM furnitures fu

        UNION ALL

        SELECT
            'insects' AS "table",
            i.id,
            i.name,
            i.image_url AS "imageUrl",
            NULL AS "buyingPrice",
            i.selling_price AS "sellingPrice",
            NULL AS "birthday",
            NULL AS "gender",
            NULL AS "speciesName",
            NULL AS "personalityName",
            NULL AS "category",
            NULL AS "variationNames",
            il.name AS "insectLocationName",
            i.weather::text AS "weather",
            NULL AS "seaPlaceName"
        FROM insects i
        LEFT JOIN insect_locations il ON il.id = i.insect_location_id

        UNION ALL

        SELECT
            'fishs' AS "table",
            fi.id,
            fi.name,
            fi.image_url AS "imageUrl",
            NULL AS "buyingPrice",
            fi.selling_price AS "sellingPrice",
            NULL AS "birthday",
            NULL AS "gender",
            NULL AS "speciesName",
            NULL AS "personalityName",
            NULL AS "category",
            NULL AS "variationNames",
            NULL AS "insectLocationName",
            NULL AS "weather",
            spl.name AS "seaPlaceName"
        FROM fishs fi
        LEFT JOIN sea_places spl ON spl.id = fi.sea_place_id

        UNION ALL

        SELECT
            'sea-creatures' AS "table",
            sc.id,
            sc.name,
            sc.image_url AS "imageUrl",
            NULL AS "buyingPrice",
            sc.selling_price AS "sellingPrice",
            NULL AS "birthday",
            NULL AS "gender",
            NULL AS "speciesName",
            NULL AS "personalityName",
            NULL AS "category",
            NULL AS "variationNames",
            NULL AS "insectLocationName",
            NULL AS "weather",
            NULL AS "seaPlaceName"
        FROM sea_creatures sc
    )
`;

export const countQuery = (search: Prisma.Sql) => Prisma.sql`
    ${allSelect}
    SELECT COUNT(*)::int AS total
    FROM all_items items
    ${search}
`;
