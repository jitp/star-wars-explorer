import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { HeaderComponent } from './header.component';
import { MatDividerModule } from '@angular/material/divider';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [
      MockModule(MatToolbarModule),
      MockModule(MatButtonModule),
      MockModule(MatIconModule),
      MockModule(MatDividerModule),
    ],
  });

  it('inputs a title', () => {
    const title = 'A test title';
    spectator = createComponent({ props: { title } });

    expect(spectator.query(byTestId('title'))).toHaveExactText(title);
  });

  it('inputs a material color', () => {
    spectator = createComponent();

    const toolbar = spectator.query(byTestId('toolbar'));

    expect(toolbar).toHaveAttribute('ng-reflect-color', 'primary');

    spectator.setInput({ color: 'accent' });

    expect(toolbar).toHaveAttribute('ng-reflect-color', 'accent');
  });

  it('outputs a menu event when clicking menu button', () => {
    let emitted = false;
    spectator = createComponent();

    spectator.output('menu').subscribe(() => (emitted = true));

    spectator.click(byTestId('menu-button'));

    expect(emitted).toBeTrue();
  });
});
