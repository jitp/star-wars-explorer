import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { fakeMovie } from 'src/tests/mocks/movie.mock';
import { MovieDetailsPresentationalComponent } from './movie-details-presentational.component';

describe('MovieDetailsPresentationalComponent', () => {
  let spectator: Spectator<MovieDetailsPresentationalComponent>;
  const createComponent = createComponentFactory({
    component: MovieDetailsPresentationalComponent,
    imports: [MockModule(MatFormFieldModule), MockModule(MatInputModule)],
  });

  it('displays movie data', () => {
    const movie = {...fakeMovie(), release_date: "4"};
    spectator = createComponent({ props: { movie } });

    expect(spectator.query(byTestId('title'))).toHaveText(movie.title);
    expect(spectator.query(byTestId('director'))).toHaveAttribute(
      'ng-reflect-value',
      movie.director
    );
    expect(spectator.query(byTestId('producer'))).toHaveAttribute(
      'ng-reflect-value',
      movie.producer
    );
    expect(spectator.query(byTestId('release'))).toHaveAttribute(
      'ng-reflect-value',
      movie.release_date
    );
  });
});
