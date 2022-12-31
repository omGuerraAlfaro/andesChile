import { TestBed } from '@angular/core/testing';

import { InfoalumnosService } from './infoalumnos.service';

describe('InfoalumnosService', () => {
  let service: InfoalumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoalumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
