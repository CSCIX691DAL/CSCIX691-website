import { TestBed } from '@angular/core/testing';

import { RfpService } from './rfp.service';

describe('RfpService', () => {
  let service: RfpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
