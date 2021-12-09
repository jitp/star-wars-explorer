import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Movie } from '@modules/movies/models';
import { MovieListContainerStore } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movie-list-container',
  templateUrl: './movie-list-container.component.html',
  styleUrls: ['./movie-list-container.component.scss'],
  providers: [MovieListContainerStore],
})
export class MovieListContainerComponent implements OnInit {
  movies$ = this.store.movies$;
  total$ = this.store.total$;
  paginatorDisabled$ = this.store.paginatorDisabled$;
  loading$ = this.store.loading$;

  constructor(
    protected store: MovieListContainerStore,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.store.loadMovies();
  }

  onPageChange(event: PageEvent) {
    if (Number(event.previousPageIndex) > event.pageIndex) {
      this.store.previousPage();
    } else {
      this.store.nextPage();
    }
  }

  onMovie(movie: Movie) {
    const matches = /.*\/(\d+)\/$/.exec(movie.url);
    this.router.navigate(['movies', matches![1]]);
  }
}
