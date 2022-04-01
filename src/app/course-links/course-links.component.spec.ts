/* import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLinksComponent } from './course-links.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import CourseLinks from '../course-links/course-links.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { CourseLinksService } from '../service/course_links.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

describe('CourseLinksComponent', () => {
  let component: CourseLinksComponent;
  let fixture: ComponentFixture<CourseLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CourseLinksComponent,
        CourseLinks,
       ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, 'X691app'),
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        AngularFireDatabase,
        Injectable,
        map,
        HttpClient,
      ],
      providers: [
        AngularFireAuthModule,
        CourseLinksService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); */