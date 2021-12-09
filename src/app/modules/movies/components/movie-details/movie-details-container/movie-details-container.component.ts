import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { MovieDetailsContainerStore } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-movie-details-container',
  templateUrl: './movie-details-container.component.html',
  styleUrls: ['./movie-details-container.component.scss'],
  providers: [MovieDetailsContainerStore],
})
export class MovieDetailsContainerComponent implements OnInit {
  movie$ = this.store.movie$;
  loading$ = this.store.loading$;

  constructor(
    protected store: MovieDetailsContainerStore,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.getMovie(
      this.activatedRoute.paramMap.pipe(map((params) => params.get('id')!))
    );
  }
}
