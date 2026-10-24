import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Gender } from '@prisma/client';

const prisma = new PrismaClient();

interface VillagerCsv {
  Name: string;
  Image: string;
  Species: string;
  Gender: string;
  Personality: string;
  Birthday: string;
}

interface MonthRangesCsv {
  'NH Jan': string;
  'NH Feb': string;
  'NH Mar': string;
  'NH Apr': string;
  'NH May': string;
  'NH Jun': string;
  'NH Jul': string;
  'NH Aug': string;
  'NH Sep': string;
  'NH Oct': string;
  'NH Nov': string;
  'NH Dec': string;
  'SH Jan': string;
  'SH Feb': string;
  'SH Mar': string;
  'SH Apr': string;
  'SH May': string;
  'SH Jun': string;
  'SH Jul': string;
  'SH Aug': string;
  'SH Sep': string;
  'SH Oct': string;
  'SH Nov': string;
  'SH Dec': string;
}

interface InsectFishCsv extends SeaCreatureCsv {
  'Where/How': string;
}

interface SeaCreatureCsv extends MonthRangesCsv {
  Name: string;
  Image: string;
  Sell: string;
  'Total Catches to Unlock': string;
}

interface FurnitureCsv {
  Name: string;
  Image: string;
  Variation: string;
  Buy: string;
  Sell: string;
}

const filesPath = {
  villagers: path.resolve(
    process.cwd(),
    'public/data/villagers_filtered_data.csv',
  ),
  insects: path.resolve(
    process.cwd(),
    'public/data/insects_filtered_data.csv',
  ),
  fish: path.resolve(
    process.cwd(),
    'public/data/fish_filtered_data.csv',
  ),
  housewares: path.resolve(
    process.cwd(),
    'public/data/housewares_filtered_data.csv',
  ),
  miscellaneous: path.resolve(
    process.cwd(),
    'public/data/miscellaneous_filtered_data.csv',
  ),
  ceilingDecor: path.resolve(
    process.cwd(),
    'public/data/ceiling_decor_filtered_data.csv',
  ),
  wallMounted: path.resolve(
    process.cwd(),
    'public/data/wall_mounted_filtered_data.csv',
  ),
};

async function main() {
  //   Entity Villager (with Species and Personalities) --------------------

  //   Read the CSV
  const content = await readFile(filesPath.villagers, 'utf-8');

  const villagers = parse(content, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: true,
  }) as VillagerCsv[];

  //   Extract Species and Personalities (removing duplication entries)
  const speciesNames = [
    ...new Set(
      villagers.map((villager) => villager.Species.trim()).filter(Boolean),
    ),
  ];
  const personalityNames = [
    ...new Set(
      villagers.map((villager) => villager.Personality.trim()).filter(Boolean),
    ),
  ];

  //   Insert species and personalities
  await prisma.species.createMany({
    data: speciesNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  await prisma.personality.createMany({
    data: personalityNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  //   Get species and personalities with UUIDs
  const species = await prisma.species.findMany();
  const personalities = await prisma.personality.findMany();

  const speciesMap = new Map(species.map((item) => [item.name, item.id]));

  const personalityMap = new Map(
    personalities.map((item) => [item.name, item.id]),
  );

  //   Insert villagers with species and personalities ids
  for (const villager of villagers) {
    const speciesId = speciesMap.get(villager.Species.trim());
    const personnalityId = personalityMap.get(villager.Personality.trim());

    if (!speciesId || !personnalityId) {
      throw new Error(
        `Espèce ou personnalité introuvable pour ${villager.Name}`,
      );
    }

    const genderValue = villager.Gender.trim().toUpperCase();

    if (genderValue !== 'MALE' && genderValue !== 'FEMALE') {
      throw new Error(
        `Genre invalide pour ${villager.Name} : ${villager.Gender}`,
      );
    }

    await prisma.villager.upsert({
      where: { name: villager.Name.trim() },
      update: {
        imageUrl: villager.Image.trim(),
        birthday: villager.Birthday.trim(),
        gender: genderValue as Gender,
        speciesId,
        personnalityId,
      },
      create: {
        name: villager.Name.trim(),
        imageUrl: villager.Image.trim(),
        birthday: villager.Birthday.trim(),
        gender: genderValue as Gender,
        speciesId,
        personnalityId,
      },
    });
  }

  console.log(
    `${speciesNames.length} espèces détectées, ` +
      `${personalityNames.length} personnalités détectées, ` +
      `${villagers.length} villageois traités.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
