import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTeamsComponent } from './admin-edit-teams.component';

describe('AdminEditTeamsComponent', () => {
  let component: AdminEditTeamsComponent;
  let fixture: ComponentFixture<AdminEditTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
