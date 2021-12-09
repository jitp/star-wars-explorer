import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetDetailsPageComponent, PlanetListPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: PlanetListPageComponent,
  },
  {
    path: ':id',
    component: PlanetDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetsRoutingModule {}
