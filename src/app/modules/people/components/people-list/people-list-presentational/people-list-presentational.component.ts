import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Person } from '@modules/people/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-people-list-presentational',
  templateUrl: './people-list-presentational.component.html',
  styleUrls: ['./people-list-presentational.component.scss'],
})
export class PeopleListPresentationalComponent {
  @Input()
  persons: Person[] = [];

  @Output('person')
  clickedPerson = new EventEmitter<Person>();
}
