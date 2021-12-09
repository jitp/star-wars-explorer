import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Planet } from '@modules/planets/models';
import { PlanetListContainerStore } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planet-list-container',
  templateUrl: './planet-list-container.component.html',
  styleUrls: ['./planet-list-container.component.scss'],
  providers: [PlanetListContainerStore],
})
export class PlanetListContainerComponent implements OnInit {
  planets$ = this.store.planets$;
  total$ = this.store.total$;
  paginatorDisabled$ = this.store.paginatorDisabled$;
  loading$ = this.store.loading$;

  constructor(
    protected store: PlanetListContainerStore,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.store.loadPlanets();
  }

  onPageChange(event: PageEvent) {
    if (Number(event.previousPageIndex) > event.pageIndex) {
      this.store.previousPage();
    } else {
      this.store.nextPage();
    }
  }

  onPlanet(planet: Planet) {
    const matches = /.*\/(\d+)\/$/.exec(planet.url);
    this.router.navigate(['planets', matches![1]]);
  }
}
