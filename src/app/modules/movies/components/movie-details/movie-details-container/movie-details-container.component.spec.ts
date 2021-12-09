import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import { fakeMovie } from 'src/tests/mocks/movie.mock';
import { MovieDetailsPresentationalComponent } from '..';
import { MovieDetailsContainerComponent } from './movie-details-container.component';
import { MovieDetailsContainerStore } from './store';

describe('MovieDetailsContainerComponent', () => {
  let spectator: Spectator<MovieDetailsContainerComponent>;
  const createComponent = createComponentFactory({
    component: MovieDetailsContainerComponent,
    declarations: [MovieDetailsPresentationalComponent],
    mocks: [ActivatedRoute],
    componentMocks: [MovieDetailsContainerStore],
    imports: [
      MockModule(MatProgressSpinnerModule),
      MockModule(MatFormFieldModule),
    ],
  });

  it('loads movie on init', () => {
    spectator = createComponent({
      providers: [
        mockProvider(MovieDetailsContainerStore, {
          getMovie: jasmine.createSpy('getMovie'),
        }),
        mockProvider(ActivatedRoute, { paramMap: of({}) }),
      ],
    });
    const store = spectator.inject(MovieDetailsContainerStore, true);

    expect(store.getMovie).toHaveBeenCalledTimes(1);
  });

  it('renders spinner when loading', () => {
    spectator = createComponent({
      providers: [
        mockProvider(MovieDetailsContainerStore, {
          getMovie: jasmine.createSpy('getMovie'),
          loading$: cold('-x', { x: true }),
        }),
        mockProvider(ActivatedRoute, { paramMap: of({}) }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    expect(spectator.query(byTestId('spinner'))).toBeTruthy();
  });

  it('does not render spinner when not loading', () => {
    spectator = createComponent({
      providers: [
        mockProvider(MovieDetailsContainerStore, {
          getMovie: jasmine.createSpy('getMovie'),
          loading$: cold('-x', { x: false }),
        }),
        mockProvider(ActivatedRoute, { paramMap: of({}) }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    expect(spectator.query(byTestId('spinner'))).toBeFalsy();
  });

  it('pushes movie to presentational component', () => {
    const movie = fakeMovie();

    spectator = createComponent({
      providers: [
        mockProvider(MovieDetailsContainerStore, {
          getMovie: jasmine.createSpy('getMovie'),
          movie$: cold('-x', { x: movie }),
        }),
        mockProvider(ActivatedRoute, { paramMap: of({}) }),
      ],
    });

    getTestScheduler().flush();
    spectator.detectChanges();

    expect(spectator.query(MovieDetailsPresentationalComponent)?.movie).toEqual(
      movie
    );
  });
});
