export const tabButtonLabels = {
  all: "everything",
  villager: "villagers",
  furniture: "furnitures",
  insect: "insects",
  fish: "fishs",
  seaCreature: "sea creatures",
};

export const apiNavigationMap = {
  "all-items": "all",
  villagers: "villagers",
  furnitures: "furnitures",
  insects: "insects",
  fishs: "fishs",
  "sea-creatures": "sea-creatures",
};

export const queryParamsMap = {
  name: "name",
  gender: "gender",
  speciesName: "speciesName",
  personalityName: "personalityName",
  buyingPrice: "buyingPrice",
  sellingPrice: "sellingPrice",
  category: "category",
  monthlyAvalaibility: "monthly_avalaibility",
};

export const filterTableMap = {
  personality_id: {
    label: "personality",
  },
  species_id: {
    label: "species",
  },
  sea_place_id: {
    label: "location",
  },
  insect_location_id: {
    label: "location",
  },
  category: {
    label: "category",
  },
  weather: {
    label: "weather",
  },
};


export const filterColumnsEnumMap = {
  category: [
    {
      filterValue: "houseware",
      name: "houseware",
    },
    {
      filterValue: "miscellaneous",
      name: "miscellaneous",
    },
    {
      filterValue: "ceiling_decor",
      name: "ceiling decor",
    },
    {
      filterValue: "wall_mounted",
      name: "wall-mounted",
    },
  ],
  weather: [
    {
      filterValue: "any_except_rain",
      name: "any except rain",
    },
    {
      filterValue: "any_weather",
      name: "any weather",
    },
    {
      filterValue: "rain_only",
      name: "rain only",
    },
  ]
};