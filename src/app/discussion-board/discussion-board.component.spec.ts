import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionBoardComponent } from './discussion-board.component';

describe('DiscussionBoardComponent', () => {
  let component: DiscussionBoardComponent;
  let fixture: ComponentFixture<DiscussionBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
