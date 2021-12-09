import { Movie } from '@modules/movies/models';
import * as faker from 'faker';

export const fakeMovie = (): Movie => ({
  director: faker.name.firstName(),
  producer: faker.name.firstName(),
  release_date: faker.date.recent().toString(),
  title: faker.lorem.sentence(),
  url: faker.lorem.sentence(),
});
