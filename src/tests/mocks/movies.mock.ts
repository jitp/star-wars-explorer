import { Movies } from '@modules/movies/models';
import * as faker from 'faker';
import { fakeMovie } from './movie.mock';

export const fakeMovies = (): Movies => ({
  count: 4,
  next: faker.lorem.sentence(),
  previous: faker.lorem.sentence(),
  results: [fakeMovie()],
});
