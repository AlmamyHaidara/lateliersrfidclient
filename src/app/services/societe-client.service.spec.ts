import { TestBed } from '@angular/core/testing';

import { SocieteClientService } from './societe-client.service';

describe('SocieteClientService', () => {
  let service: SocieteClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocieteClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
