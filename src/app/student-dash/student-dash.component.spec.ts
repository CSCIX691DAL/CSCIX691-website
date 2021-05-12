import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashComponent } from './student-dash.component';

describe('StudentDashComponent', () => {
  let component: StudentDashComponent;
  let fixture: ComponentFixture<StudentDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
