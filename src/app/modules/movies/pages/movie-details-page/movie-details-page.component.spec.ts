import { MovieDetailsContainerComponent } from '@modules/movies/components';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MovieDetailsPageComponent } from '..';

describe('MovieDetailsPageComponent', () => {
  let spectator: Spectator<MovieDetailsPageComponent>;
  const createComponent = createComponentFactory({
    component: MovieDetailsPageComponent,
    declarations: [MockComponent(MovieDetailsContainerComponent)],
  });

  it('renders movie details container component', () => {
    spectator = createComponent();

    expect(spectator.query(MovieDetailsContainerComponent)).toBeTruthy();
  });
});
