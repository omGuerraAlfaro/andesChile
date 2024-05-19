import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebpayRequest } from '../../interfaces/webpay_request';
import { WebpayResponse } from '../../interfaces/webpay_response';

@Injectable({
  providedIn: 'root'
})
export class WebpayService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {}
  
  webpayCrearOrden(body: WebpayRequest):Observable<WebpayResponse>{
    console.log(body);
    return this.http.post<WebpayResponse>(`${environment.api}/payment/initiate`, body, this.httpOptions); 
  }
  
  webpayRespuesta(modelo: WebpayResponse): Observable<any>{
    return this.http.post(`${environment.api}webpay-respuesta`, modelo, this.httpOptions); 
  }
}
