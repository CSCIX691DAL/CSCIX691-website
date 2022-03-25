import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsPageComponent } from './testimonialsPage.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('TestimonialsPageComponent', () => {
  let component: TestimonialsPageComponent;
  let fixture: ComponentFixture<TestimonialsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialsPageComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, 'X691app'),
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
      ],
      providers: [
        AngularFireAuthModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should get testimonials and star ratings", () => {
    expect(component.getTestimonialsFromDatabase).toBeTruthy();
    expect(component.getStars).toBeTruthy();
  });
});
