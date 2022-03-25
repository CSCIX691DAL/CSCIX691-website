import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsComponent } from './testimonials.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialsComponent ],
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
    fixture = TestBed.createComponent(TestimonialsComponent);
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
