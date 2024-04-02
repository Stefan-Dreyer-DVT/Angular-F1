import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1DetailsComponent } from './f1-details.component';

describe('F1DetailsComponent', () => {
  let component: F1DetailsComponent;
  let fixture: ComponentFixture<F1DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1DetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(F1DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
