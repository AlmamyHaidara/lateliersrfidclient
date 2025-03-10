import { TestBed } from '@angular/core/testing';

import { AssociationArtTagService } from './association-art-tag.service';

describe('AssociationArtTagService', () => {
  let service: AssociationArtTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationArtTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
