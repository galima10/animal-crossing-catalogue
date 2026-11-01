import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Gender, Weather, Month, Hemisphere, Category } from '@prisma/client';

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
}

interface FurnitureCsv {
  Name: string;
  Image: string;
  Variation: string;
  Buy: string;
  Sell: string;
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

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

interface MonthAvalaibility {
  key: string;
  value: string;
}

function getMonthAvalaibilities(record: any): MonthAvalaibility[] {
  return [
    ...months.map((month) => ({
      key: `NH ${month}`,
      value: record[`NH ${month}`],
    })),
    ...months.map((month) => ({
      key: `SH ${month}`,
      value: record[`SH ${month}`],
    })),
  ];
}

function parseAvalaibility(avalaibility: MonthAvalaibility) {
  const value = avalaibility.value;
  const month = avalaibility.key.split(' ')[1];
  const hemisphere =
    avalaibility.key.split(' ').shift() === 'NH' ? 'NORTH' : 'SOUTH';
  let isAllDay: boolean = false;
  if (value === 'All day') isAllDay = true;

  const normalizedValue = value.replace(/\u00A0/g, ' ').trim();

  const ranges =
    normalizedValue.match(
      /\d{1,2}\s*(?:AM|PM)\s*[-–—]\s*\d{1,2}\s*(?:AM|PM)/gi,
    ) ?? [];

  const parsedRanges: { startHour: string; endHour: string }[] = ranges.map(
    (range: string) => {
      const [startHour, endHour] = range.split(/\s*[-–—]\s*/);

      return { startHour, endHour };
    },
  );

  if (value !== 'NA' && value !== 'All day' && ranges.length === 0) {
    throw new Error(`Format d'horaire non reconnu : ${value}`);
  }

  return {
    month,
    hemisphere,
    ranges: parsedRanges,
    isAllDay,
  };
}

interface MonthRangeApparitionData {
  month: Month;
  startHour: string | null;
  endHour: string | null;
  isAllDay: boolean;
  hemisphere: Hemisphere;
  insectId?: string;
  fishId?: string;
  seaCreatureId?: string;
}

async function insertMonthRangeApparitions(
  availabilities: MonthAvalaibility[],
  id: string,
  type: 'insect' | 'fish' | 'seaCreature',
) {
  const relation =
    type === 'insect'
      ? { insectId: id }
      : type === 'fish'
        ? { fishId: id }
        : { seaCreatureId: id };

  await prisma.monthRangeApparition.deleteMany({
    where: {
      ...relation,
    },
  });

  for (const avalaibility of availabilities) {
    const { month, hemisphere, ranges, isAllDay } =
      parseAvalaibility(avalaibility);

    let data: MonthRangeApparitionData = {
      month: month.toUpperCase() as Month,
      startHour: null,
      endHour: null,
      isAllDay,
      hemisphere: hemisphere as Hemisphere,
      ...relation,
    };

    if (ranges.length === 1) {
      data = {
        ...data,
        startHour: ranges[0].startHour,
        endHour: ranges[0].endHour,
      };
      await prisma.monthRangeApparition.create({ data });
    } else {
      for (const range of ranges) {
        data = {
          ...data,
          startHour: range.startHour,
          endHour: range.endHour,
        };
        await prisma.monthRangeApparition.create({ data });
      }
    }
    await prisma.monthRangeApparition.create({ data });
  }
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
    data: speciesNames.map((name) => ({ name: name.toLowerCase() })),
    skipDuplicates: true,
  });

  await prisma.personality.createMany({
    data: personalityNames.map((name) => ({ name: name.toLowerCase() })),
    skipDuplicates: true,
  });

  const species = await prisma.species.findMany();
  const personalities = await prisma.personality.findMany();

  const speciesMap = new Map(species.map((item) => [item.name, item.id]));
  const personalityMap = new Map(
    personalities.map((item) => [item.name, item.id]),
  );

  for (const villager of villagers) {
    const speciesId = speciesMap.get(villager.Species.trim().toLowerCase());
    const personalityId = personalityMap.get(villager.Personality.trim().toLowerCase());

    if (!speciesId || !personalityId) {
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
      where: { name: villager.Name.trim().toLowerCase() },
      update: {
        imageUrl: villager.Image.trim(),
        birthday: villager.Birthday.trim(),
        gender: genderValue as Gender,
        speciesId,
        personalityId,
      },
      create: {
        name: villager.Name.trim().toLowerCase(),
        imageUrl: villager.Image.trim(),
        birthday: villager.Birthday.trim(),
        gender: genderValue as Gender,
        speciesId,
        personalityId,
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
      insects.map((insect) => insect['Where/How'].trim().toLowerCase()).filter(Boolean),
    ),
  ];

  await prisma.insectLocation.createMany({
    data: insectLocationNames.map((name) => ({ name: name.toLowerCase() })),
    skipDuplicates: true,
  });

  const insectLocations = await prisma.insectLocation.findMany();

  const insectLocationsMap = new Map(
    insectLocations.map((item) => [item.name, item.id]),
  );

  for (const insect of insects) {
    const insectLocationId = insectLocationsMap.get(insect['Where/How'].trim().toLowerCase());

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
      where: { name: insect.Name.trim().toLowerCase() },
      update: {
        imageUrl: insect.Image.trim(),
        sellingPrice: Number(insect.Sell),
        weather: weatherValue as Weather,
        insectLocationId,
      },
      create: {
        name: insect.Name.trim().toLowerCase(),
        imageUrl: insect.Image.trim(),
        sellingPrice: Number(insect.Sell),
        weather: weatherValue as Weather,
        insectLocationId,
      },
    });

    const { id: insectId } = await prisma.insect.findFirstOrThrow({
      where: {
        name: insect.Name.toLowerCase(),
      },
      select: {
        id: true,
      },
    });

    const availabilities = getMonthAvalaibilities(insect);
    await insertMonthRangeApparitions(availabilities, insectId, 'insect');
  }

  console.log(
    `${insectLocationNames.length} localisations d'insectes détectées, ` +
      `${insects.length} insectes traités.`,
  );
}

async function insertFishs() {
  const fishs = (await parseCsv(filesPath.fish)) as InsectCsv[];

  const seaPlacesNames = [
    ...new Set(fishs.map((fish) => fish['Where/How'].trim().toLowerCase()).filter(Boolean)),
  ];

  await prisma.seaPlace.createMany({
    data: seaPlacesNames.map((name) => ({ name: name.toLowerCase() })),
    skipDuplicates: true,
  });

  const seaPlaces = await prisma.seaPlace.findMany();

  const seaPlacesMap = new Map(seaPlaces.map((item) => [item.name, item.id]));

  for (const fish of fishs) {
    const seaPlaceId = seaPlacesMap.get(fish['Where/How'].trim().toLowerCase());

    if (!seaPlaceId) {
      throw new Error(`Localisation du poisson introuvable pour ${fish.Name}`);
    }

    await prisma.fish.upsert({
      where: { name: fish.Name.trim().toLowerCase() },
      update: {
        imageUrl: fish.Image.trim(),
        sellingPrice: Number(fish.Sell),
        seaPlaceId,
      },
      create: {
        name: fish.Name.trim().toLowerCase(),
        imageUrl: fish.Image.trim(),
        sellingPrice: Number(fish.Sell),
        seaPlaceId,
      },
    });

    const { id: fishId } = await prisma.fish.findFirstOrThrow({
      where: {
        name: fish.Name.toLowerCase(),
      },
      select: {
        id: true,
      },
    });

    const availabilities = getMonthAvalaibilities(fish);
    await insertMonthRangeApparitions(availabilities, fishId, 'fish');
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
      where: { name: seaCreature.Name.trim().toLowerCase() },
      update: {
        imageUrl: seaCreature.Image.trim(),
        sellingPrice: Number(seaCreature.Sell),
      },
      create: {
        name: seaCreature.Name.trim().toLowerCase(),
        imageUrl: seaCreature.Image.trim(),
        sellingPrice: Number(seaCreature.Sell),
      },
    });

    const { id: seaCreatureId } = await prisma.seaCreature.findFirstOrThrow({
      where: {
        name: seaCreature.Name.toLowerCase(),
      },
      select: {
        id: true,
      },
    });

    const availabilities = getMonthAvalaibilities(seaCreature);

    await insertMonthRangeApparitions(
      availabilities,
      seaCreatureId,
      'seaCreature',
    );
  }

  console.log(`${seaCreatures.length} créatures marines et crustacés traités.`);
}

function getUniqueVariationsFurniture(rows: FurnitureCsv[]): {
  uniqueFurnitures: FurnitureCsv[];
  furnitureVariations: FurnitureCsv[];
} {
  const seen = new Set<string>();

  const uniqueFurnitures: FurnitureCsv[] = [];
  const furnitureVariations: FurnitureCsv[] = [];

  for (const row of rows) {
    if (seen.has(row.Name)) {
      furnitureVariations.push(row);
    } else {
      seen.add(row.Name);
      uniqueFurnitures.push(row);
    }
  }

  return {
    uniqueFurnitures,
    furnitureVariations,
  };
}

async function insertVariations(furnitureVariations: FurnitureCsv[]) {
  const furnitures = await prisma.furniture.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const furnitureIdByName = new Map(
    furnitures.map((furniture) => [furniture.name, furniture.id]),
  );

  for (const furniture of furnitureVariations) {
    const furnitureId = furnitureIdByName.get(furniture.Name.trim().toLowerCase());

    if (!furnitureId) {
      throw new Error(`Meuble introuvable : ${furniture.Name}`);
    }

    const variationName = furniture.Variation.trim().toLowerCase();

    await prisma.variation.upsert({
      where: {
        furnitureId_variationName: {
          furnitureId,
          variationName,
        },
      },
      update: {
        variationImageUrl: furniture.Image.trim(),
      },
      create: {
        furnitureId,
        variationName: variationName,
        variationImageUrl: furniture.Image.trim(),
      },
    });
  }
}

async function insertFurnitures(
  uniqueFurnitures: FurnitureCsv[],
  category: Category,
) {
  for (const furniture of uniqueFurnitures) {
    await prisma.furniture.upsert({
      where: { name: furniture.Name.trim().toLowerCase() },
      update: {
        category: category,
        imageUrl: furniture.Image.trim(),
        buyingPrice: Number(furniture.Buy),
        sellingPrice: Number(furniture.Sell),
      },
      create: {
        name: furniture.Name.trim().toLowerCase(),
        category: category,
        imageUrl: furniture.Image.trim(),
        buyingPrice: Number(furniture.Buy),
        sellingPrice: Number(furniture.Sell),
      },
    });
  }
}

async function insertHousewares() {
  const housewares = (await parseCsv(filesPath.housewares)) as FurnitureCsv[];
  const { uniqueFurnitures, furnitureVariations } =
    getUniqueVariationsFurniture(housewares);
  await insertFurnitures(uniqueFurnitures, 'HOUSEWARE');
  await insertVariations(furnitureVariations);
  console.log(
    `${uniqueFurnitures.length + furnitureVariations.length} articles ménagés traités.`,
  );
}

async function insertMiscellaneous() {
  const miscellaneous = (await parseCsv(
    filesPath.miscellaneous,
  )) as FurnitureCsv[];
  const { uniqueFurnitures, furnitureVariations } =
    getUniqueVariationsFurniture(miscellaneous);
  await insertFurnitures(uniqueFurnitures, 'MISCELLANEOUS');
  await insertVariations(furnitureVariations);
  console.log(
    `${uniqueFurnitures.length + furnitureVariations.length} meubles divers traités.`,
  );
}

async function insertCeilingDecor() {
  const ceilingDecor = (await parseCsv(
    filesPath.ceilingDecor,
  )) as FurnitureCsv[];
  const { uniqueFurnitures, furnitureVariations } =
    getUniqueVariationsFurniture(ceilingDecor);
  await insertFurnitures(uniqueFurnitures, 'CEILING_DECOR');
  await insertVariations(furnitureVariations);
  console.log(
    `${uniqueFurnitures.length + furnitureVariations.length} décorations de plafond traités.`,
  );
}

async function insertWallMounted() {
  const wallMounted = (await parseCsv(filesPath.wallMounted)) as FurnitureCsv[];
  const { uniqueFurnitures, furnitureVariations } =
    getUniqueVariationsFurniture(wallMounted);
  await insertFurnitures(uniqueFurnitures, 'WALL_MOUNTED');
  await insertVariations(furnitureVariations);
  console.log(
    `${uniqueFurnitures.length + furnitureVariations.length} meubles fixés au mur traités.`,
  );
}

async function main() {
  await insertVillagers();
  await insertInsects();
  await insertFishs();
  await insertSeaCreatures();
  await insertHousewares();
  await insertMiscellaneous();
  await insertCeilingDecor();
  await insertWallMounted();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
