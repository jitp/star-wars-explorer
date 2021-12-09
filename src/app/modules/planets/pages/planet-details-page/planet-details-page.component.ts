import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planet-details-page',
  templateUrl: './planet-details-page.component.html',
  styleUrls: ['./planet-details-page.component.scss'],
})
export class PlanetDetailsPageComponent {}
