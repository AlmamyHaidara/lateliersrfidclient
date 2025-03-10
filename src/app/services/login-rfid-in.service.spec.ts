import { TestBed } from '@angular/core/testing';

import { LoginRfidInService } from './login-rfid-in.service';

describe('LoginRfidInService', () => {
  let service: LoginRfidInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRfidInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
