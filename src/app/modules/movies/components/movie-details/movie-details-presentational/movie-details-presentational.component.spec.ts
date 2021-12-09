import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsPresentationalComponent } from './movie-details-presentational.component';

describe('MovieDetailsPresentationalComponent', () => {
  let component: MovieDetailsPresentationalComponent;
  let fixture: ComponentFixture<MovieDetailsPresentationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsPresentationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsPresentationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
