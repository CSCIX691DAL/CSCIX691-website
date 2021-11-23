import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDatesComponent } from './dueDates.component';

describe('DueDatesComponent', () => {
  let component: DueDatesComponent;
  let fixture: ComponentFixture<DueDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueDatesComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
