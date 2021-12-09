import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Person } from '@modules/people/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-person-details-presentational',
  templateUrl: './person-details-presentational.component.html',
  styleUrls: ['./person-details-presentational.component.scss'],
})
export class PersonDetailsPresentationalComponent {
  @Input()
  person: Person | null = null;
}
