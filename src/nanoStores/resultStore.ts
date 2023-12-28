import { atom } from 'nanostores';

export type filterProps = 'make' | 'model' | 'year' | 'priceRange' | 'mileage';
export const filterPropsSwedish = {
  märke: 'make',
  modell: 'model',
  årsmodell: 'year',
  pris: 'priceRange',
  mätarställning: 'mileage',
};

export type ResultFilters = {
  query?: string;
  make?: Set<string>;
  model?: Set<string>;
  year?: Set<string>;
  priceRange?: Set<string>;
  mileage?: Set<string>;
};

export const resultFilters = atom<ResultFilters>({
  query: '',
  make: new Set<string>(),
  model: new Set<string>(),
  year: new Set<string>(),
  priceRange: new Set<string>(),
  mileage: new Set<string>(),
});

export const currentResultCount = atom(0);
