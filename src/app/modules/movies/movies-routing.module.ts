import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsPageComponent, MovieListPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: MovieListPageComponent,
  },
  {
    path: ':id',
    component: MovieDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
