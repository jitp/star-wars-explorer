import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PersonDetailsContainerStore } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-person-details-container',
  templateUrl: './person-details-container.component.html',
  styleUrls: ['./person-details-container.component.scss'],
  providers: [PersonDetailsContainerStore],
})
export class PersonDetailsContainerComponent implements OnInit {
  person$ = this.store.person$;
  loading$ = this.store.loading$;

  constructor(
    protected store: PersonDetailsContainerStore,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.getPerson(
      this.activatedRoute.paramMap.pipe(map((params) => params.get('id')!))
    );
  }
}
