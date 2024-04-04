import { TestBed } from '@angular/core/testing';

import { WikiDescriptionService } from './wiki-description.service';

describe('WikiDescriptionService', () => {
  let service: WikiDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
