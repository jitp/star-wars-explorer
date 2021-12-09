import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person, PersonDetailsState } from '@modules/people/models';
import { PeopleService } from '@modules/people/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

const defaultState = (): PersonDetailsState => ({ person: null, loading: false });

@Injectable()
export class PersonDetailsContainerStore extends ComponentStore<PersonDetailsState> {
  constructor(protected peopleService: PeopleService) {
    super(defaultState());
  }

  readonly person$ = this.select(({ person }) => person);
  readonly loading$ = this.select(({ loading }) => loading);

  readonly setPerson = this.updater((state, person: Person | null) => ({
    ...state,
    person,
  }));
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly getPerson = this.effect((trigger$: Observable<string>) => {
    return trigger$.pipe(
      switchMap((id: string) => {
        this.setLoading(true);
        return this.peopleService.getPerson(id).pipe(
          finalize(() => this.setLoading(false)),
          tapResponse(
            (person) => this.setPerson(person),
            (error: HttpErrorResponse) => this.setPerson(null)
          )
        );
      })
    );
  });
}
