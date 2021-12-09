import { Router } from '@angular/router';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { MovieListContainerComponent } from './movie-list-container.component';
import { MovieListContainerStore } from './store';

fdescribe('MovieListContainerComponent', () => {
  let spectator: Spectator<MovieListContainerComponent>;
  const createComponent = createComponentFactory({
    component: MovieListContainerComponent,
    mocks: [Router],
    componentMocks: [MovieListContainerStore],
    shallow: true
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
});
