import { TestBed } from '@angular/core/testing';

import { WebpayService } from './webpay.service';

describe('WebpayService', () => {
  let service: WebpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
