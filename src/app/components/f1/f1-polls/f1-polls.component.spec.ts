import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1PollsComponent } from './f1-polls.component';

describe('F1PollsComponent', () => {
  let component: F1PollsComponent;
  let fixture: ComponentFixture<F1PollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1PollsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(F1PollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
