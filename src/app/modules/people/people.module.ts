import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleService } from '@modules/people/services';
import { PeopleListPageComponent, PersonDetailsPageComponent } from './pages';
import {
  PeopleListContainerComponent,
  PeopleListPresentationalComponent,
  PersonDetailsPresentationalComponent,
  PersonDetailsContainerComponent,
} from './components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const materialModules = [
  MatListModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    PeopleListPageComponent,
    PeopleListContainerComponent,
    PeopleListPresentationalComponent,
    PersonDetailsPresentationalComponent,
    PersonDetailsContainerComponent,
    PersonDetailsPageComponent,
  ],
  imports: [...materialModules, SharedModule, PeopleRoutingModule],
  providers: [PeopleService],
})
export class PeopleModule {}
