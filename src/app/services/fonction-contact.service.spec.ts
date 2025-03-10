import { TestBed } from '@angular/core/testing';

import { FonctionContactService } from './fonction-contact.service';

describe('FonctionContactService', () => {
  let service: FonctionContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
