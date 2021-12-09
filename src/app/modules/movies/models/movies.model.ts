import { Movie } from ".";

export interface Movies {
  count: number;
  next: string;
  previous: string;
  results: Movie[];
}