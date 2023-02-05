import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpayComponent } from './webpay.component';

describe('WebpayComponent', () => {
  let component: WebpayComponent;
  let fixture: ComponentFixture<WebpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
