import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { fakeMovie } from 'src/tests/mocks/movie.mock';
import { fakeMovies } from 'src/tests/mocks/movies.mock';
import { MovieService } from '.';
import { Movie, Movies } from '../models';

describe('MovieService', () => {
  let spectator: SpectatorHttp<MovieService>;
  const createHttpService = createHttpFactory(MovieService);

  it('retrieves list of movies', () => {
    spectator = createHttpService();
    const movies = fakeMovies();
    let expectedMovies: Movies | undefined;

    spectator.service.list().subscribe((m) => (expectedMovies = m));
    const req = spectator.expectOne(
      'https://swapi.dev/api/films',
      HttpMethod.GET
    );
    req.flush(movies);

    expect(expectedMovies).toEqual(movies);
  });

  it('retrieves a page movies', () => {
    spectator = createHttpService();
    const movies = fakeMovies();
    let expectedMovies: Movies | undefined;
    const pageUrl = 'test_url';

    spectator.service.list(pageUrl).subscribe((m) => (expectedMovies = m));
    const req = spectator.expectOne(pageUrl, HttpMethod.GET);
    req.flush(movies);

    expect(expectedMovies).toEqual(movies);
  });

  it('retrieves a movie by id', () => {
    spectator = createHttpService();
    const movie = fakeMovie();
    let expectedMovie: Movie | undefined;

    spectator.service.getMovie("1").subscribe((m) => (expectedMovie = m));
    const req = spectator.expectOne(
      'https://swapi.dev/api/films/1',
      HttpMethod.GET
    );
    req.flush(movie);

    expect(expectedMovie).toEqual(movie);
  });
});
