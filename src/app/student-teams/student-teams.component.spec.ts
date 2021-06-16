import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeamsComponent } from './student-teams.component';

describe('StudentTeamsComponent', () => {
  let component: StudentTeamsComponent;
  let fixture: ComponentFixture<StudentTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
