import { TestBed } from '@angular/core/testing';

import { SendemailService } from './sendemail.service';

describe('SendemailService', () => {
  let service: SendemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
