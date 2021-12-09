import { Movie } from '@modules/movies/models';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { fakeMovie } from 'src/tests/mocks/movie.mock';
import { MovieListPresentationalComponent } from './movie-list-presentational.component';

describe('MovieListPresentationalComponent', () => {
  let spectator: Spectator<MovieListPresentationalComponent>;
  const createComponent = createComponentFactory({
    component: MovieListPresentationalComponent,
    shallow: true,
  });

  it('renders list of movies', () => {
    const movies = [fakeMovie(), fakeMovie(), fakeMovie()];
    spectator = createComponent({
      props: { movies },
    });
    const elements = spectator.queryAll('mat-list-item');
    expect(elements.length).toEqual(3);
    elements.forEach((el, index) => {
      expect(el.querySelector('h3')).toHaveText(movies[index].title);
    });
  });

  it("outputs clicked movie", () => {
    const movies = [fakeMovie(), fakeMovie(), fakeMovie()];
    spectator = createComponent({
      props: { movies },
    });
    let expectedMovie: Movie | undefined;

    spectator.component.clickedMovie.subscribe((m: Movie) => expectedMovie = m);

    spectator.click(spectator.queryLast('mat-list-item')!);

    expect(expectedMovie).toEqual(movies[2]);
  })
});
