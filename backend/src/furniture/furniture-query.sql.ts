import { Prisma } from '@prisma/client';

export const furnitureSelect = Prisma.sql`
  SELECT
    fu.id,
    fu.name,
    fu.category,
    fu.image_url AS "imageUrl",
    fu.buying_price AS "buyingPrice",
    fu.selling_price AS "sellingPrice",
    COALESCE((
        SELECT
            string_agg(
                DISTINCT va.variation_name,
                ', ' ORDER BY va.variation_name
            )
        FROM variations va
        WHERE va.furniture_id = fu.id
    ), '') AS variationNames
  FROM furnitures fu
`;

export const furnitureDetails = Prisma.sql`
  SELECT
    fu.id,
    fu.name,
    fu.category,
    fu.image_url AS "imageUrl",
    fu.buying_price AS "buyingPrice",
    fu.selling_price AS "sellingPrice",
    COALESCE((
        SELECT
            string_agg(
                DISTINCT va.variation_name,
                ', ' ORDER BY va.variation_name
            )
        FROM variations va
        WHERE va.furniture_id = fu.id
    ), '') AS variationNames,
    COALESCE((
        SELECT
            jsonb_agg(
                jsonb_build_object(
                    'variationName', va.variation_name,
                    'variationImageUrl', va.variation_image_url
                )
                ORDER BY va.variation_name
            )
        FROM variations va
        WHERE va.furniture_id = fu.id
    ), '[]'::jsonb) As variations
  FROM furnitures fu
`;

export const countQuery = (search: Prisma.Sql) => Prisma.sql`
  SELECT COUNT(*)::int AS total
  FROM furnitures fu
  ${search}
`;

export const furnitureExtraSearchConditions = (
  q: string,
): Prisma.Sql[] => {
  const pattern = `%${q.trim()}%`;

  return [
    Prisma.sql`
      EXISTS (
        SELECT 1
        FROM variations va
        WHERE va.furniture_id = fu.id
          AND va.variation_name ILIKE ${pattern}
      )
    `,
  ];
};