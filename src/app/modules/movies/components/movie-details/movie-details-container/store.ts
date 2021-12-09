import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MovieDetailsState } from '@modules/movies/models';
import { MovieService } from '@modules/movies/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

const defaultState = (): MovieDetailsState => ({ movie: null, loading: false });

@Injectable()
export class MovieDetailsContainerStore extends ComponentStore<MovieDetailsState> {
  constructor(protected movieService: MovieService) {
    super(defaultState());
  }

  readonly movie$ = this.select(({ movie }) => movie);
  readonly loading$ = this.select(({ loading }) => loading);

  readonly setMovie = this.updater((state, movie: Movie | null) => ({
    ...state,
    movie,
  }));
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly getMovie = this.effect((trigger$: Observable<string>) => {
    return trigger$.pipe(
      switchMap((id: string) => {
        this.setLoading(true);
        return this.movieService.getMovie(id).pipe(
          finalize(() => this.setLoading(false)),
          tapResponse(
            (movie) => this.setMovie(movie),
            (error: HttpErrorResponse) => this.setMovie(null)
          )
        );
      })
    );
  });
}
