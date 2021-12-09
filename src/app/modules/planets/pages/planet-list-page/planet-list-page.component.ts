import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planet-list-page',
  templateUrl: './planet-list-page.component.html',
  styleUrls: ['./planet-list-page.component.scss'],
})
export class PlanetListPageComponent {}
