import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MovieListState, Movies } from '@modules/movies/models';
import { MovieService } from '@modules/movies/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import {
  filter,
  finalize,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

const defaultState = (): MovieListState => ({
  movies: [],
  total: 0,
  nextPage: null,
  previousPage: null,
  paginatorDisabled: false,
  loading: false,
});

@Injectable()
export class MovieListContainerStore extends ComponentStore<MovieListState> {
  constructor(protected movieService: MovieService) {
    super(defaultState());
  }

  readonly movies$ = this.select(({ movies }) => movies);
  readonly total$ = this.select(({ total }) => total);
  readonly nextPage$ = this.select(({ nextPage }) => nextPage);
  readonly previousPage$ = this.select(({ previousPage }) => previousPage);
  readonly paginatorDisabled$ = this.select(
    ({ paginatorDisabled }) => paginatorDisabled
  );
  readonly loading$ = this.select(({ loading }) => loading);

  readonly setMovies = this.updater((state, movies: Movie[]) => ({
    ...state,
    movies,
  }));
  readonly setTotal = this.updater((state, total: number) => ({
    ...state,
    total,
  }));
  readonly setPreviousPage = this.updater(
    (state, previousPage: string | null) => ({
      ...state,
      previousPage,
    })
  );
  readonly setNextPage = this.updater((state, nextPage: string | null) => ({
    ...state,
    nextPage,
  }));
  readonly setPaginatorDisabled = this.updater(
    (state, paginatorDisabled: boolean) => ({
      ...state,
      paginatorDisabled,
    })
  );
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly loadMovies = this.effect((trigger$: Observable<string | void>) => {
    return trigger$.pipe(
      switchMap((page) => {
        this.setLoading(true);
        return this.movieService.list(page ?? null).pipe(
          finalize(() => {
            this.setLoading(false);
            this.setPaginatorDisabled(false);
          }),
          tapResponse(
            (movies: Movies) => {
              this.setMovies(movies.results);
              this.setTotal(movies.count);
              this.setNextPage(movies.next);
              this.setPreviousPage(movies.previous);
            },
            (error: HttpErrorResponse) => {
              this.setMovies([]);
              this.setTotal(0);
              this.setNextPage(null);
              this.setPreviousPage(null);
            }
          )
        );
      })
    );
  });

  readonly nextPage = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      withLatestFrom(this.nextPage$),
      filter(([, nextPage]) => nextPage !== null),
      tap({
        next: ([, nextPage]) => {
          this.setPaginatorDisabled(true);
          nextPage && this.loadMovies(nextPage);
        },
      })
    );
  });

  readonly previousPage = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      withLatestFrom(this.previousPage$),
      filter(([, previousPage]) => previousPage !== null),
      tap({
        next: ([, previousPage]) => {
          this.setPaginatorDisabled(true);
          previousPage && this.loadMovies(previousPage);
        },
      })
    );
  });
}
