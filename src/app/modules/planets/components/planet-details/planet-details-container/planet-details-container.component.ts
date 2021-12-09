import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlanetDetailsContainerStore } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planet-details-container',
  templateUrl: './planet-details-container.component.html',
  styleUrls: ['./planet-details-container.component.scss'],
  providers: [PlanetDetailsContainerStore],
})
export class PlanetDetailsContainerComponent implements OnInit {
  planet$ = this.store.planet$;
  loading$ = this.store.loading$;

  constructor(
    protected store: PlanetDetailsContainerStore,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.getPlanet(
      this.activatedRoute.paramMap.pipe(map((params) => params.get('id')!))
    );
  }
}
