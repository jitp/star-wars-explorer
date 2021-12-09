import { Planet } from ".";

export interface PlanetListState {
  planets: Planet[];
  total: number;
  nextPage: string | null;
  previousPage: string | null;
  paginatorDisabled: boolean;
  loading: boolean;
}
