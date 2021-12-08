import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [MockModule(MatButtonModule)],
  });

  it('renders three navigational buttons', () => {
    spectator = createComponent();

    expect(spectator.query(byTestId('people-btn'))).toBeTruthy();
    expect(spectator.query(byTestId('movies-btn'))).toBeTruthy();
    expect(spectator.query(byTestId('planets-btn'))).toBeTruthy();
  });
});
