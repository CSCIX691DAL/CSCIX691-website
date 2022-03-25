/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashComponent } from './admin-dash.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TeamService } from './../service/team.service';
import { UserService } from './../service/user.service';
import { ProjectService } from './../service/project.service';
import {RfpService} from '../service/rfp.service';
import {AnnouncementService} from '../service/announcement.service';
import {AuthService} from '../service/auth.service';
import { dueDateService } from '../service/duedate.service';
import { QuestionnaireService} from '../service/questionnaire.service';
import Announcement from "../announcement/announcement.model"
import {NgxCsvParser} from 'ngx-csv-parser';
import {NgxCSVParserError} from 'ngx-csv-parser';
import { User } from '../user/user.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from '../rfp/rfp.model';
import Project from '../projects/project.model';
import Team from '../team/team.model';
import { Student } from '../user/student.model';
import DueDates from '../dueDates/dueDates.model';
import { AngularFireDatabase } from '@angular/fire/database';

describe('AdminDashComponent', () => {
  let component: AdminDashComponent;
  let fixture: ComponentFixture<AdminDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminDashComponent,
        Project,
        Team,
        Student,
        DueDates,
        RFP,
        User,
        Announcement,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, 'X691app'),
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        NgxCsvParser,
        NgxCSVParserError,
        pdfMake,
        pdfFonts,
        AngularFireDatabase,
      ],
      providers: [
        AngularFireAuthModule,
        TeamService,
        UserService,
        ProjectService,
        RfpService,
        AnnouncementService,
        AuthService,
        dueDateService,
        QuestionnaireService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */