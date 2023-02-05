import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpayRespuestaComponent } from './webpay-respuesta.component';

describe('WebpayRespuestaComponent', () => {
  let component: WebpayRespuestaComponent;
  let fixture: ComponentFixture<WebpayRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpayRespuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebpayRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
