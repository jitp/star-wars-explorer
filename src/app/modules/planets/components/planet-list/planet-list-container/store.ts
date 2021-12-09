import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet, PlanetListState, Planets } from '@modules/planets/models';
import { PlanetService } from '@modules/planets/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import {
  filter,
  finalize,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

const defaultState = (): PlanetListState => ({
  planets: [],
  total: 0,
  nextPage: null,
  previousPage: null,
  paginatorDisabled: false,
  loading: false,
});

@Injectable()
export class PlanetListContainerStore extends ComponentStore<PlanetListState> {
  constructor(protected planetService: PlanetService) {
    super(defaultState());
  }

  readonly planets$ = this.select(({ planets }) => planets);
  readonly total$ = this.select(({ total }) => total);
  readonly nextPage$ = this.select(({ nextPage }) => nextPage);
  readonly previousPage$ = this.select(({ previousPage }) => previousPage);
  readonly paginatorDisabled$ = this.select(
    ({ paginatorDisabled }) => paginatorDisabled
  );
  readonly loading$ = this.select(({ loading }) => loading);

  readonly setPlanets = this.updater((state, planets: Planet[]) => ({
    ...state,
    planets,
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

  readonly loadPlanets = this.effect((trigger$: Observable<string | void>) => {
    return trigger$.pipe(
      switchMap((page) => {
        this.setLoading(true);
        return this.planetService.list(page ?? null).pipe(
          finalize(() => {
            this.setLoading(false);
            this.setPaginatorDisabled(false);
          }),
          tapResponse(
            (planets: Planets) => {
              this.setPlanets(planets.results);
              this.setTotal(planets.count);
              this.setNextPage(planets.next);
              this.setPreviousPage(planets.previous);
            },
            (error: HttpErrorResponse) => {
              this.setPlanets([]);
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
          nextPage && this.loadPlanets(nextPage);
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
          previousPage && this.loadPlanets(previousPage);
        },
      })
    );
  });
}
