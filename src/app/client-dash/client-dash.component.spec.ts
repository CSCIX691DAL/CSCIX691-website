/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientDashComponent } from './client-dash.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RfpService } from '../service/rfp.service';
import { TestimonialService } from '../service/testimonial_client.service';
import { FeedBacklService } from '../service/feedback.service';
import { ProjectService } from '../service/project.service';
import { TeamService } from '../service/team.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ClientDashComponent', () => {
  let component: ClientDashComponent;
  let fixture: ComponentFixture<ClientDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDashComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, 'X691app'),
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        NgbModule,
      ],
      providers: [
        AngularFireAuthModule,
        RfpService,
        TestimonialService,
        FeedBacklService,
        ProjectService,
        TeamService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    //test
  });
});
 */