import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from '@modules/movies/services';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { getTestScheduler } from 'jasmine-marbles';
import { fakeMovie } from 'src/tests/mocks/movie.mock';
import { MovieDetailsContainerStore } from './store';

describe('MovieDetailsContainerStore', () => {
  let spectator: SpectatorService<MovieDetailsContainerStore>;
  const createService = createServiceFactory({
    service: MovieDetailsContainerStore,
    mocks: [MovieService],
  });

  it('gets a movie', () => {
    const movie = fakeMovie();
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    scheduler.run((helpers) => {
      movieService.getMovie.and.returnValue(
        helpers.cold('-(x|)', { x: movie })
      );

      spectator.service.getMovie('3');

      helpers
        .expectObservable(spectator.service.movie$)
        .toBe('xy', { x: null, y: movie });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('yx', { x: false, y: true });
    });
  });

  it('does not get a movie when error happens', () => {
    const error: Partial<HttpErrorResponse> = {
      error: 404,
      message: 'Not found',
    };
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    scheduler.run((helpers) => {
      movieService.getMovie.and.returnValue(helpers.cold('-#', {}, error));

      spectator.service.getMovie('3');

      helpers.expectObservable(spectator.service.movie$).toBe('x', { x: null });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('yx', { x: false, y: true });
    });
  });
});
