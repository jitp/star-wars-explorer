import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from '@modules/movies/services';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { getTestScheduler } from 'jasmine-marbles';
import { fakeMovies } from 'src/tests/mocks/movies.mock';
import { MovieListContainerStore } from './store';

describe('MovieListContainerStore', () => {
  let spectator: SpectatorService<MovieListContainerStore>;
  const createService = createServiceFactory({
    service: MovieListContainerStore,
    mocks: [MovieService],
  });

  it('loads movies', () => {
    const movies = fakeMovies();
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    scheduler.run((helpers) => {
      movieService.list.and.returnValue(helpers.cold('-(x|)', { x: movies }));

      spectator.service.loadMovies();

      helpers
        .expectObservable(spectator.service.movies$)
        .toBe('xy', { x: [], y: movies.results });
      helpers
        .expectObservable(spectator.service.total$)
        .toBe('xy', { x: 0, y: movies.count });
      helpers
        .expectObservable(spectator.service.previousPage$)
        .toBe('xy', { x: null, y: movies.previous });
      helpers
        .expectObservable(spectator.service.nextPage$)
        .toBe('xy', { x: null, y: movies.next });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('yx', { x: false, y: true });
      helpers
        .expectObservable(spectator.service.paginatorDisabled$)
        .toBe('x', { x: false });
    });
  });

  it('does not load movies', () => {
    const error: Partial<HttpErrorResponse> = {
      error: 404,
      message: 'Not found',
    };
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    scheduler.run((helpers) => {
      movieService.list.and.returnValue(helpers.cold('-#', {}, error));

      spectator.service.loadMovies();

      helpers.expectObservable(spectator.service.movies$).toBe('xx', { x: [] });
      helpers.expectObservable(spectator.service.total$).toBe('x', { x: 0 });
      helpers
        .expectObservable(spectator.service.previousPage$)
        .toBe('x', { x: null });
      helpers
        .expectObservable(spectator.service.nextPage$)
        .toBe('x', { x: null });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('yx', { x: false, y: true });
      helpers
        .expectObservable(spectator.service.paginatorDisabled$)
        .toBe('x', { x: false });
    });
  });

  it('loads next page', () => {
    const movies = fakeMovies();
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    spectator.service.setNextPage('test');

    scheduler.run((helpers) => {
      movieService.list.and.returnValue(helpers.cold('-(x|)', { x: movies }));

      spectator.service.nextPage();

      helpers
        .expectObservable(spectator.service.movies$)
        .toBe('xy', { x: [], y: movies.results });
      helpers
        .expectObservable(spectator.service.total$)
        .toBe('xy', { x: 0, y: movies.count });
      helpers
        .expectObservable(spectator.service.previousPage$)
        .toBe('xy', { x: null, y: movies.previous });
      helpers
        .expectObservable(spectator.service.nextPage$)
        .toBe('xy', { x: 'test', y: movies.next });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('yx', { x: false, y: true });
      helpers
        .expectObservable(spectator.service.paginatorDisabled$)
        .toBe('yx', { x: false, y: true });
    });
  });

  it('does not load next page when next is null', () => {
    const movies = fakeMovies();
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    scheduler.run((helpers) => {
      movieService.list.and.returnValue(helpers.cold('-(x|)', { x: movies }));

      spectator.service.nextPage();

      helpers.expectObservable(spectator.service.movies$).toBe('x', { x: [] });
      helpers.expectObservable(spectator.service.total$).toBe('x', { x: 0 });
      helpers
        .expectObservable(spectator.service.previousPage$)
        .toBe('x', { x: null });
      helpers
        .expectObservable(spectator.service.nextPage$)
        .toBe('x', { x: null });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('x', { x: false });
      helpers
        .expectObservable(spectator.service.paginatorDisabled$)
        .toBe('x', { x: false });
    });
  });

  it('loads previous page', () => {
    const movies = fakeMovies();
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    spectator.service.setPreviousPage('test');

    scheduler.run((helpers) => {
      movieService.list.and.returnValue(helpers.cold('-(x|)', { x: movies }));

      spectator.service.previousPage();

      helpers
        .expectObservable(spectator.service.movies$)
        .toBe('xy', { x: [], y: movies.results });
      helpers
        .expectObservable(spectator.service.total$)
        .toBe('xy', { x: 0, y: movies.count });
      helpers
        .expectObservable(spectator.service.previousPage$)
        .toBe('xy', { x: 'test', y: movies.previous });
      helpers
        .expectObservable(spectator.service.nextPage$)
        .toBe('xy', { x: null, y: movies.next });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('yx', { x: false, y: true });
      helpers
        .expectObservable(spectator.service.paginatorDisabled$)
        .toBe('yx', { x: false, y: true });
    });
  });

  it('does not load previous page when previous is null', () => {
    const movies = fakeMovies();
    spectator = createService();
    const movieService = spectator.inject(MovieService);

    const scheduler = getTestScheduler();

    scheduler.run((helpers) => {
      movieService.list.and.returnValue(helpers.cold('-(x|)', { x: movies }));

      spectator.service.previousPage();

      helpers.expectObservable(spectator.service.movies$).toBe('x', { x: [] });
      helpers.expectObservable(spectator.service.total$).toBe('x', { x: 0 });
      helpers
        .expectObservable(spectator.service.previousPage$)
        .toBe('x', { x: null });
      helpers
        .expectObservable(spectator.service.nextPage$)
        .toBe('x', { x: null });
      helpers
        .expectObservable(spectator.service.loading$)
        .toBe('x', { x: false });
      helpers
        .expectObservable(spectator.service.paginatorDisabled$)
        .toBe('x', { x: false });
    });
  });
});
