/* import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTeamsComponent } from './admin-create-teams.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import { TeamService } from '../service/team.service';
import { Student } from '../user/student.model';
import { User } from '../user/user.model';
import { UserService } from '../service/user.service';
import Team from '../team/team.model';
import DueDate from '../dueDates/dueDates.model';
import Questionnaire from '../student-questionnaire/student-questionnaire.model';
import {QuestionnaireService} from '../service/questionnaire.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

describe('AdminCreateTeamsComponent', () => {
  let component: AdminCreateTeamsComponent;
  let fixture: ComponentFixture<AdminCreateTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminCreateTeamsComponent,
        Project,
        Student,
        User,
        Team,
        DueDate,
        Questionnaire,
       ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, 'X691app'),
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        pdfMake,
        pdfFonts,
      ],
      providers: [
        AngularFireAuthModule,
        ProjectService,
        TeamService,
        UserService,
        QuestionnaireService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
 */