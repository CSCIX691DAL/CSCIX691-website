import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTeamsComponent } from './display-teams.component';

describe('DisplayTeamsComponent', () => {
  let component: DisplayTeamsComponent;
  let fixture: ComponentFixture<DisplayTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
