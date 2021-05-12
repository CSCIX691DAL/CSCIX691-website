import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpComponent } from './rfp.component';

describe('RfpComponent', () => {
  let component: RfpComponent;
  let fixture: ComponentFixture<RfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
