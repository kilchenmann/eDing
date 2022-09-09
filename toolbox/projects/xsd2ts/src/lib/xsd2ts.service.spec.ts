import { TestBed } from '@angular/core/testing';

import { Xsd2tsService } from './xsd2ts.service';

describe('Xsd2tsService', () => {
  let service: Xsd2tsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Xsd2tsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
