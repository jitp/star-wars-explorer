import { MovieListContainerComponent } from '@modules/movies/components';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MovieListPageComponent } from '..';

describe('MovieListPageComponent', () => {
  let spectator: Spectator<MovieListPageComponent>;
  const createComponent = createComponentFactory({
    component: MovieListPageComponent,
    declarations: [MockComponent(MovieListContainerComponent)],
  });

  it('renders movie list container component', () => {
    spectator = createComponent();

    expect(spectator.query(MovieListContainerComponent)).toBeTruthy();
  });
});
