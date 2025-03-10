import { TestBed } from '@angular/core/testing';

import { EmployeSocieteService } from './employe-societe.service';

describe('EmployeSocieteService', () => {
  let service: EmployeSocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeSocieteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
