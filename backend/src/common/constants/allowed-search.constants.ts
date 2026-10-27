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
    column: 'vi.birthday',
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
