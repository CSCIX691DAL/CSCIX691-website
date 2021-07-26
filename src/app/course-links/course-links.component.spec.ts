import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLinksComponent } from './course-links.component';

describe('CourseLinksComponent', () => {
  let component: CourseLinksComponent;
  let fixture: ComponentFixture<CourseLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseLinksComponent ]
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
});