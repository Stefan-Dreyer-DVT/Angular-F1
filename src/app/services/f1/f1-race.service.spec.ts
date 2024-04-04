import { TestBed } from '@angular/core/testing';

import { F1RaceService } from './f1-race.service';

describe('F1RaceService', () => {
  let service: F1RaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1RaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
