import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTeamsComponent } from './admin-create-teams.component';

describe('AdminCreateTeamsComponent', () => {
  let component: AdminCreateTeamsComponent;
  let fixture: ComponentFixture<AdminCreateTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
