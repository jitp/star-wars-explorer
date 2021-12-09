import { PeopleListContainerStore } from './store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Person } from '@modules/people/models';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-people-list-container',
  templateUrl: './people-list-container.component.html',
  styleUrls: ['./people-list-container.component.scss'],
  providers: [PeopleListContainerStore],
})
export class PeopleListContainerComponent implements OnInit {
  persons$ = this.store.persons$;
  total$ = this.store.total$;
  paginatorDisabled$ = this.store.paginatorDisabled$;
  loading$ = this.store.loading$;

  constructor(
    protected store: PeopleListContainerStore,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.store.loadPersons();
  }

  onPageChange(event: PageEvent) {
    if (Number(event.previousPageIndex) > event.pageIndex) {
      this.store.previousPage();
    } else {
      this.store.nextPage();
    }
  }

  onPerson(person: Person) {
    const matches = /.*\/(\d+)\/$/.exec(person.url);
    this.router.navigate(['people', matches![1]]);
  }
}
