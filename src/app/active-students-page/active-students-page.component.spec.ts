import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStudentsPageComponent } from './active-students-page.component';

describe('ActiveStudentsPageComponent', () => {
  let component: ActiveStudentsPageComponent;
  let fixture: ComponentFixture<ActiveStudentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveStudentsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
