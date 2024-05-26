import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebpayRequest, confirmTransfRequest } from '../../../interfaces/webpay_request';
import { WebpayResponse } from '../../../interfaces/webpay_response';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class WebpayService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  webpayCrearOrden(body: WebpayRequest): Observable<WebpayResponse> {
    console.log(body);
    return this.http.post<WebpayResponse>(`${environment.api}/payment/initiate`, body, this.httpOptions);
  }

  confirmarTransferencia(body: confirmTransfRequest): Observable<confirmTransfRequest> {
    console.log(body);
    return this.http.post<confirmTransfRequest>(`${environment.api}/payment/confirmacionTransferencia`, body, this.httpOptions);
  }
}
