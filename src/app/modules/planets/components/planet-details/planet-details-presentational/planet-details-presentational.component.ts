import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Planet } from '@modules/planets/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planet-details-presentational',
  templateUrl: './planet-details-presentational.component.html',
  styleUrls: ['./planet-details-presentational.component.scss'],
})
export class PlanetDetailsPresentationalComponent {
  @Input()
  planet: Planet | null = null;
}
