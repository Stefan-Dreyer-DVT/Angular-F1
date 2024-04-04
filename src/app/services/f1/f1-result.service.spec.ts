import { TestBed } from '@angular/core/testing';

import { F1ResultService } from './f1-result.service';

describe('F1ResultService', () => {
  let service: F1ResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1ResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
