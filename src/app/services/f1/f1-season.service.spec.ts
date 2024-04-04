import { TestBed } from '@angular/core/testing';

import { F1SeasonService } from './f1-season.service';

describe('F1SeasonService', () => {
  let service: F1SeasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1SeasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
