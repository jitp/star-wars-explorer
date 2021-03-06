import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListPageComponent, PersonDetailsPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: PeopleListPageComponent,
  },
  {
    path: ':id',
    component: PersonDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
