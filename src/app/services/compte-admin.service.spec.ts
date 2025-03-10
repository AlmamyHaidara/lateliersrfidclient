import { TestBed } from '@angular/core/testing';

import { CompteAdminService } from './compte-admin.service';

describe('CompteAdminService', () => {
  let service: CompteAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
