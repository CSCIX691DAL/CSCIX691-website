import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { StudentQuestionnaireComponent } from './student-questionnaire.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('StudentQuestionnaireComponent', () => {
  let component: StudentQuestionnaireComponent;
  let fixture: ComponentFixture<StudentQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentQuestionnaireComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, 'X691app'),
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
      ],
      providers: [
        AngularFireAuthModule,
      ]
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
