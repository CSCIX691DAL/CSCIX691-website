import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import {StudentDashComponent} from './student-dash/student-dash.component';
import {ClientDashComponent} from './client-dash/client-dash.component';
import {AdminDashComponent} from './admin-dash/admin-dash.component';
import { ProjectsComponent } from './projects/projects.component';
import { ChangepwComponent } from './changepw/changepw.component';
import {RfpComponent} from './rfp/rfp.component';
import {TestimonialsPageComponent} from './testimonialsPage/testimonialsPage.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import {StudentQuestionnaireComponent} from './student-questionnaire/student-questionnaire.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { AdminCreateTeamsComponent } from './admin-create-teams/admin-create-teams.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'student-dashboard', component: StudentDashComponent},
  { path: 'client-dashboard', component: ClientDashComponent},
  { path: 'admin-dashboard', component: AdminDashComponent},
  { path: 'changepw', component: ChangepwComponent},
  { path: 'submitRFP', component: RfpComponent},
  { path: 'editRFP/:id', component: RfpComponent},
  { path: 'student-questionnaire', component: StudentQuestionnaireComponent},
  { path: 'testimonialsPage', component: TestimonialsPageComponent},
  { path: 'announcement', component: AnnouncementComponent},
  { path: 'unsubscribe', component: UnsubscribeComponent},
  { path: 'members', component: MembersComponent},
  { path: 'admin-create-teams', component: AdminCreateTeamsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
