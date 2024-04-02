import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1SelectorComponent } from './f1-selector.component';

describe('F1SelectorComponent', () => {
  let component: F1SelectorComponent;
  let fixture: ComponentFixture<F1SelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1SelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(F1SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
