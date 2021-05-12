import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsPageComponent } from './testimonialsPage.component';

describe('TestimonialsPageComponent', () => {
  let component: TestimonialsPageComponent;
  let fixture: ComponentFixture<TestimonialsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialsPageComponent ]
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
});
