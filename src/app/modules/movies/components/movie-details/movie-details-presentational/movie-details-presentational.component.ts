import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '@modules/movies/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movie-details-presentational',
  templateUrl: './movie-details-presentational.component.html',
  styleUrls: ['./movie-details-presentational.component.scss'],
})
export class MovieDetailsPresentationalComponent {
  @Input()
  movie: Movie | null = null;
}
