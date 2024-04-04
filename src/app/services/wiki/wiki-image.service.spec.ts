import { TestBed } from '@angular/core/testing';

import { WikiImageService } from './wiki-image.service';

describe('WikiImageService', () => {
  let service: WikiImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
