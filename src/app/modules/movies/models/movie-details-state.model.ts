import { Movie } from ".";

export interface MovieDetailsState {
    movie: Movie | null;
    loading: boolean;
}