export const allowedFilter = {
  villagers: [
    {
      label: "Personality",
      filterName: "personality_id",
      table: "personality",
    },
    {
      label: "Species",
      filterName: "species_id",
      table: "species",
    },
  ],
  furnitures: [
    {
      label: "category",
      filterName: "category",
    },
  ],
  insects: [
    {
      label: "weather",
      filterName: "weather",
    },
    {
      label: "location",
      filterName: "insect_location_id",
      table: "insectLocation",
    },
  ],
  fishs: [
    {
      label: "location",
      filterName: "sea_place_id",
      table: "seaPlace",
    },
  ],
  "sea-creatures": null,
};

