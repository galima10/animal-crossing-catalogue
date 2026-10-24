import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Gender, Weather } from '@prisma/client';

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

interface InsectCsv extends FishCsv {
  'Where/How': string;
  Weather: string;
}

interface FishCsv extends SeaCreatureCsv {
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
  insects: path.resolve(process.cwd(), 'public/data/insects_filtered_data.csv'),
  fish: path.resolve(process.cwd(), 'public/data/fish_filtered_data.csv'),
  seaCreatures: path.resolve(
    process.cwd(),
    'public/data/sea_creatures_filtered_data.csv',
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

async function parseCsv(file: string) {
  const content = await readFile(file, 'utf-8');

  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: true,
  });
}

async function insertVillagers() {
  const villagers = (await parseCsv(filesPath.villagers)) as VillagerCsv[];

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

  await prisma.species.createMany({
    data: speciesNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  await prisma.personality.createMany({
    data: personalityNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const species = await prisma.species.findMany();
  const personalities = await prisma.personality.findMany();

  const speciesMap = new Map(species.map((item) => [item.name, item.id]));
  const personalityMap = new Map(
    personalities.map((item) => [item.name, item.id]),
  );

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

async function insertInsects() {
  const insects = (await parseCsv(filesPath.insects)) as InsectCsv[];

  const insectLocationNames = [
    ...new Set(
      insects.map((insect) => insect['Where/How'].trim()).filter(Boolean),
    ),
  ];

  await prisma.insectLocation.createMany({
    data: insectLocationNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const insectLocations = await prisma.insectLocation.findMany();

  const insectLocationsMap = new Map(
    insectLocations.map((item) => [item.name, item.id]),
  );

  for (const insect of insects) {
    const insectLocationId = insectLocationsMap.get(insect['Where/How'].trim());

    if (!insectLocationId) {
      throw new Error(
        `Localisation de l'insecte introuvable pour ${insect.Name}`,
      );
    }

    const weatherValue = insect.Weather.trim()
      .toUpperCase()
      .replaceAll(' ', '_');

    if (
      weatherValue !== 'ANY_EXCEPT_RAIN' &&
      weatherValue !== 'ANY_WEATHER' &&
      weatherValue !== 'RAIN_ONLY'
    ) {
      throw new Error(
        `Météo invalide pour ${insect.Name} : ${(insect.Weather, weatherValue)}`,
      );
    }

    await prisma.insect.upsert({
      where: { name: insect.Name.trim() },
      update: {
        imageUrl: insect.Image.trim(),
        sellingPrice: Number(insect.Sell),
        monthlyAvalaibility: Number(insect['Total Catches to Unlock']),
        weather: weatherValue as Weather,
        insectLocationId,
      },
      create: {
        name: insect.Name.trim(),
        imageUrl: insect.Image.trim(),
        sellingPrice: Number(insect.Sell),
        monthlyAvalaibility: Number(insect['Total Catches to Unlock']),
        weather: weatherValue as Weather,
        insectLocationId,
      },
    });
  }

  console.log(
    `${insectLocationNames.length} localisations d'insectes détectées, ` +
      `${insects.length} insectes traités.`,
  );
}

async function insertFishs() {
  const fishs = (await parseCsv(filesPath.fish)) as InsectCsv[];

  const seaPlacesNames = [
    ...new Set(fishs.map((fish) => fish['Where/How'].trim()).filter(Boolean)),
  ];

  await prisma.seaPlace.createMany({
    data: seaPlacesNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const seaPlaces = await prisma.seaPlace.findMany();

  const seaPlacesMap = new Map(seaPlaces.map((item) => [item.name, item.id]));

  for (const fish of fishs) {
    const seaPlaceId = seaPlacesMap.get(fish['Where/How'].trim());

    if (!seaPlaceId) {
      throw new Error(`Localisation du poisson introuvable pour ${fish.Name}`);
    }

    await prisma.fish.upsert({
      where: { name: fish.Name.trim() },
      update: {
        imageUrl: fish.Image.trim(),
        sellingPrice: Number(fish.Sell),
        monthlyAvalaibility: Number(fish['Total Catches to Unlock']),
        seaPlaceId,
      },
      create: {
        name: fish.Name.trim(),
        imageUrl: fish.Image.trim(),
        sellingPrice: Number(fish.Sell),
        monthlyAvalaibility: Number(fish['Total Catches to Unlock']),
        seaPlaceId,
      },
    });
  }

  console.log(
    `${seaPlaces.length} localisations d'insectes détectées, ` +
      `${fishs.length} insectes traités.`,
  );
}

async function insertSeaCreatures() {
  const seaCreatures = (await parseCsv(filesPath.seaCreatures)) as InsectCsv[];

  for (const seaCreature of seaCreatures) {
    await prisma.seaCreature.upsert({
      where: { name: seaCreature.Name.trim() },
      update: {
        imageUrl: seaCreature.Image.trim(),
        sellingPrice: Number(seaCreature.Sell),
        monthlyAvalaibility: Number(seaCreature['Total Catches to Unlock']),
      },
      create: {
        name: seaCreature.Name.trim(),
        imageUrl: seaCreature.Image.trim(),
        sellingPrice: Number(seaCreature.Sell),
        monthlyAvalaibility: Number(seaCreature['Total Catches to Unlock']),
      },
    });
  }

  console.log(`${seaCreatures.length} créatures marines et crustacés traités.`);
}

async function main() {
  await insertVillagers();
  await insertInsects();
  await insertFishs();
  await insertSeaCreatures();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
