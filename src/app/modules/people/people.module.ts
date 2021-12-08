import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { MainComponent } from './pages';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
