import { PeopleService } from '@modules/people/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { PeopleListState, Person, People } from '@modules/people/models';
import { Observable } from 'rxjs';
import {
  filter,
  finalize,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const defaultState = (): PeopleListState => ({
  persons: [],
  total: 0,
  nextPage: null,
  previousPage: null,
  paginatorDisabled: false,
  loading: false,
});

@Injectable()
export class PeopleListContainerStore extends ComponentStore<PeopleListState> {
  constructor(protected peopleService: PeopleService) {
    super(defaultState());
  }

  readonly persons$ = this.select(({ persons }) => persons);
  readonly total$ = this.select(({ total }) => total);
  readonly nextPage$ = this.select(({ nextPage }) => nextPage);
  readonly previousPage$ = this.select(({ previousPage }) => previousPage);
  readonly paginatorDisabled$ = this.select(
    ({ paginatorDisabled }) => paginatorDisabled
  );
  readonly loading$ = this.select(({ loading }) => loading);

  readonly setPersons = this.updater((state, persons: Person[]) => ({
    ...state,
    persons,
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

  readonly loadPersons = this.effect((trigger$: Observable<string | void>) => {
    return trigger$.pipe(
      switchMap((page) => {
        this.setLoading(true);
        return this.peopleService.list(page ?? null).pipe(
          finalize(() => {
            this.setLoading(false);
            this.setPaginatorDisabled(false);
          }),
          tapResponse(
            (people: People) => {
              this.setPersons(people.results);
              this.setTotal(people.count);
              this.setNextPage(people.next);
              this.setPreviousPage(people.previous);
            },
            (error: HttpErrorResponse) => {
              this.setPersons([]);
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
          nextPage && this.loadPersons(nextPage);
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
          previousPage && this.loadPersons(previousPage);
        },
      })
    );
  });
}
