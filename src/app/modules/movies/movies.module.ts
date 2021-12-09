import { NgModule } from '@angular/core';
import { MoviesRoutingModule } from './movies-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';
import {
  MovieDetailsPresentationalComponent,
  MovieDetailsContainerComponent,
  MovieListContainerComponent,
  MovieListPresentationalComponent,
} from './components';
import { MovieListPageComponent, MovieDetailsPageComponent } from './pages';
import { MovieService } from './services';

const materialModules = [
  MatListModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    MovieDetailsPresentationalComponent,
    MovieDetailsContainerComponent,
    MovieListContainerComponent,
    MovieListPresentationalComponent,
    MovieListPageComponent,
    MovieDetailsPageComponent,
  ],
  imports: [SharedModule, ...materialModules, MoviesRoutingModule],
  providers: [MovieService],
})
export class MoviesModule {}
