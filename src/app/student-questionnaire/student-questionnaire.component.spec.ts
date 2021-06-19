import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuestionnaireComponent } from './student-questionnaire.component';

describe('StudentQuestionnaireComponent', () => {
  let component: StudentQuestionnaireComponent;
  let fixture: ComponentFixture<StudentQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
