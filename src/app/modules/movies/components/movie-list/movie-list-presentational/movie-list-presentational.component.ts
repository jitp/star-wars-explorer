import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Movie } from '@modules/movies/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movie-list-presentational',
  templateUrl: './movie-list-presentational.component.html',
  styleUrls: ['./movie-list-presentational.component.scss'],
})
export class MovieListPresentationalComponent {
  @Input()
  movies: Movie[] = [];

  @Output('movie')
  clickedMovie = new EventEmitter<Movie>();
}
