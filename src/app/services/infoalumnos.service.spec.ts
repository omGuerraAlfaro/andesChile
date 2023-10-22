import { TestBed } from '@angular/core/testing';

import { InfoApoderadoService } from './infoApoderado.service';

describe('InfoApoderadoService', () => {
  let service: InfoApoderadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoApoderadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
