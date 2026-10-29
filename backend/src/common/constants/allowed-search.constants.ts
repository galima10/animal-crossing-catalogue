export type SearchableColumn = {
  column: string;
  type: 'text' | 'enum';
};

export const fishSearchableColumns: SearchableColumn[] = [
  {
    column: 'fi.name',
    type: 'text',
  },
  {
    column: 'spl.name',
    type: 'text',
  },
];

export const insectsSearchableColumns: SearchableColumn[] = [
  {
    column: 'i.name',
    type: 'text',
  },
  {
    column: 'il.name',
    type: 'text',
  },
];

export const seaCreatureSearchableColumns: SearchableColumn[] = [
  {
    column: 'sc.name',
    type: 'text',
  },
];

export const villagersSearchableColumns: SearchableColumn[] = [
  {
    column: 'vi.name',
    type: 'text',
  },
  {
    column: 'vi.gender',
    type: 'enum',
  },
  {
    column: 'sps.name',
    type: 'text',
  },
  {
    column: 'p.name',
    type: 'text',
  },
];

export const furnituresSearchableColumns: SearchableColumn[] = [
  {
    column: 'fu.name',
    type: 'text',
  },
  {
    column: 'fu.category',
    type: 'enum',
  },
];

export const allSearchableColumns: SearchableColumn[] = [
  {
    column: 'items."name"',
    type: 'text',
  },
  {
    column: 'items."gender"',
    type: 'enum',
  },
  {
    column: 'items."speciesName"',
    type: 'text',
  },
  {
    column: 'items."personalityName"',
    type: 'text',
  },
  {
    column: 'items."category"',
    type: 'enum',
  },
  {
    column: 'items."insectLocationName"',
    type: 'text',
  },
  {
    column: 'items."seaPlaceName"',
    type: 'text',
  },
];
