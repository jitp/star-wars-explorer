import { NgModule } from '@angular/core';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetListPageComponent, PlanetDetailsPageComponent } from './pages';
import { SharedModule } from '@shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  PlanetListContainerComponent,
  PlanetListPresentationalComponent,
  PlanetDetailsContainerComponent,
  PlanetDetailsPresentationalComponent,
} from './components';
import { PlanetService } from './services';

const materialModules = [
  MatListModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    PlanetListPageComponent,
    PlanetDetailsPageComponent,
    PlanetListPresentationalComponent,
    PlanetListContainerComponent,
    PlanetDetailsContainerComponent,
    PlanetDetailsPresentationalComponent,
  ],
  imports: [SharedModule, ...materialModules, PlanetsRoutingModule],
  providers: [PlanetService],
})
export class PlanetsModule {}
