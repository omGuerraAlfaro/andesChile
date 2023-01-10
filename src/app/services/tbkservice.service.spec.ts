import { TestBed } from '@angular/core/testing';

import { TbkserviceService } from './tbkservice.service';

describe('TbkserviceService', () => {
  let service: TbkserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbkserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
