import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Planet } from '@modules/planets/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planet-list-presentational',
  templateUrl: './planet-list-presentational.component.html',
  styleUrls: ['./planet-list-presentational.component.scss'],
})
export class PlanetListPresentationalComponent {
  @Input()
  planets: Planet[] = [];

  @Output('planet')
  clickedPlanet = new EventEmitter<Planet>();
}
