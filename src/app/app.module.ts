import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ClientDashComponent } from './client-dash/client-dash.component';
import { StudentDashComponent } from './student-dash/student-dash.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { ProjectsComponent } from './projects/projects.component';
import { ChangepwComponent } from './changepw/changepw.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AuthService } from './service/auth.service';
import { PastComponent } from './past/past.component';
import { RfpComponent } from './rfp/rfp.component';
import {TestimonialsPageComponent} from './testimonialsPage/testimonialsPage.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ClientDashComponent,
    StudentDashComponent,
    AdminDashComponent,
    PasswordResetComponent,
    ProjectsComponent,
    ChangepwComponent,
    TestimonialsComponent,
    TestimonialsPageComponent,
    ChangepwComponent,
    PastComponent,
    RfpComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'X691app'),
    AngularFireAuthModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    NgbCollapseModule,
    MatSelectModule,
    NgxCsvParserModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
