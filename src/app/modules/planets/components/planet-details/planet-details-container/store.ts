import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet, PlanetDetailsState } from '@modules/planets/models';
import { PlanetService } from '@modules/planets/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

const defaultState = (): PlanetDetailsState => ({
  planet: null,
  loading: false,
});

@Injectable()
export class PlanetDetailsContainerStore extends ComponentStore<PlanetDetailsState> {
  constructor(protected planetService: PlanetService) {
    super(defaultState());
  }

  readonly planet$ = this.select(({ planet }) => planet);
  readonly loading$ = this.select(({ loading }) => loading);

  readonly setPlanet = this.updater((state, planet: Planet | null) => ({
    ...state,
    planet,
  }));
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly getPlanet = this.effect((trigger$: Observable<string>) => {
    return trigger$.pipe(
      switchMap((id: string) => {
        this.setLoading(true);
        return this.planetService.getPlanet(id).pipe(
          finalize(() => this.setLoading(false)),
          tapResponse(
            (planet) => this.setPlanet(planet),
            (error: HttpErrorResponse) => this.setPlanet(null)
          )
        );
      })
    );
  });
}
