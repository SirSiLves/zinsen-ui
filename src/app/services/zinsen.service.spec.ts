import { TestBed } from '@angular/core/testing';

import { ZinsenService } from './zinsen.service';

describe('ZinsenService', () => {
  let service: ZinsenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZinsenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
