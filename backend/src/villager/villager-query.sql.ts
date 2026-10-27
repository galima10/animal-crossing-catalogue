import { Prisma } from "@prisma/client";

export const villagerSelect = Prisma.sql`
  SELECT
    vi.id,
    vi.name,
    vi.image_url AS "imageUrl",
    vi.birthday,
    vi.gender,
    sps.name AS "speciesName",
    p.name AS "personalityName"
  FROM villagers vi
  LEFT JOIN species sps ON sps.id = vi.species_id
  LEFT JOIN personalities p ON p.id = vi.personality_id
`;

export const countQuery = (search: Prisma.Sql) => Prisma.sql`
  SELECT COUNT(*)::int AS total
  FROM villagers vi
  LEFT JOIN species sps ON sps.id = vi.species_id
  LEFT JOIN personalities p ON p.id = vi.personality_id
  ${search}
`;