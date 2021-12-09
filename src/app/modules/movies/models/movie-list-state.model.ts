import { Movie } from ".";

export interface MovieListState {
  movies: Movie[];
  total: number;
  nextPage: string | null;
  previousPage: string | null;
  paginatorDisabled: boolean;
  loading: boolean;
}