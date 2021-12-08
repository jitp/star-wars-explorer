import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./modules/people/people.module').then((m) => m.PeopleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
