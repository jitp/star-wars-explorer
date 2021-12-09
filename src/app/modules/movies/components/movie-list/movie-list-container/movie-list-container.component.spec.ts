import { Router } from '@angular/router';
import { cold, getTestScheduler } from 'jasmine-marbles';
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { fakeMovie } from 'src/tests/mocks/movie.mock';
import { MovieListContainerComponent } from './movie-list-container.component';
import { MovieListContainerStore } from './store';
import { MovieListPresentationalComponent } from '..';
import { MockModule } from 'ng-mocks';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

describe('MovieListContainerComponent', () => {
  let spectator: Spectator<MovieListContainerComponent>;
  const createComponent = createComponentFactory({
    component: MovieListContainerComponent,
    declarations: [MovieListPresentationalComponent],
    mocks: [Router],
    componentMocks: [MovieListContainerStore],
    imports: [
      MockModule(MatPaginatorModule),
      MockModule(MatProgressSpinnerModule),
      MockModule(MatListModule),
    ],
  });

  it('loads movies on init', () => {
    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
        }),
      ],
      detectChanges: false,
    });
    const store = spectator.inject(MovieListContainerStore, true);
    expect(store.loadMovies).not.toHaveBeenCalled();
    spectator.detectChanges();
    expect(store.loadMovies).toHaveBeenCalledTimes(1);
  });

  it('pushes movies to presentational component', () => {
    const movies = [fakeMovie(), fakeMovie(), fakeMovie()];

    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
          movies$: cold('-x', { x: movies }),
        }),
      ],
    });

    const presentational = spectator.query(MovieListPresentationalComponent);

    getTestScheduler().flush();
    spectator.detectChanges();

    expect(presentational?.movies).toEqual(movies);
  });

  it('navigates to movie details when clicking a list item', () => {
    const movies = [
      fakeMovie(),
      fakeMovie(),
      { ...fakeMovie(), url: 'http://sample.com/3/' },
    ];

    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
          movies$: cold('-x', { x: movies }),
        }),
      ],
    });

    const router = spectator.inject(Router);
    const presentational = spectator.query(MovieListPresentationalComponent);

    getTestScheduler().flush();
    spectator.detectChanges();

    presentational?.clickedMovie.emit(movies[2]);

    spectator.detectChanges();

    expect(router.navigate).toHaveBeenCalledOnceWith(['movies', '3']);
  });

  it('navigates to next page', () => {
    const pageEvent: PageEvent = {
      length: 54,
      pageIndex: 2,
      pageSize: 10,
      previousPageIndex: 1,
    };

    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
          nextPage: jasmine.createSpy('nextPage'),
          paginatorDisabled$: cold('-x', { x: false }),
        }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    const store = spectator.inject(MovieListContainerStore, true);

    spectator.triggerEventHandler('mat-paginator', 'page', pageEvent);

    expect(store.nextPage).toHaveBeenCalledTimes(1);
  });

  it('navigates to previous page', () => {
    const pageEvent: PageEvent = {
      length: 54,
      pageIndex: 2,
      pageSize: 10,
      previousPageIndex: 4,
    };

    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
          previousPage: jasmine.createSpy('previousPage'),
          paginatorDisabled$: cold('-x', { x: false }),
        }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    const store = spectator.inject(MovieListContainerStore, true);

    spectator.triggerEventHandler('mat-paginator', 'page', pageEvent);

    expect(store.previousPage).toHaveBeenCalledTimes(1);
  });

  it('disables paginator', () => {
    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
          paginatorDisabled$: cold('-x', { x: true }),
        }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    expect(spectator.query('mat-paginator')).toHaveAttribute(
      'ng-reflect-disabled',
      'true'
    );
  });

  it('shows spinner when loading', () => {
    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
          loading$: cold("--x", {x: true}),
        }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    expect(spectator.query(byTestId("spinner-wrapper"))).toBeTruthy();
  });

  it('hides spinner when loading has finished', () => {
    spectator = createComponent({
      providers: [
        mockProvider(MovieListContainerStore, {
          loadMovies: jasmine.createSpy('loadMovies'),
          loading$: cold('--x', { x: true }),
        }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    expect(spectator.query(byTestId('spinner-wrapper'))).toBeTruthy();
  });
});
