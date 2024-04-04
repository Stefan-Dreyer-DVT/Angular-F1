import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1ResultsComponent } from './f1-results.component';

describe('F1ResultsComponent', () => {
  let component: F1ResultsComponent;
  let fixture: ComponentFixture<F1ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1ResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(F1ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
