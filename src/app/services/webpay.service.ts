import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebpayRequest } from '../../interfaces/webpay_request';
import { WebpayResponse } from '../../interfaces/webpay_response';

@Injectable({
  providedIn: 'root'
})
export class WebpayService {
  // api: string;
  constructor(private http: HttpClient) { 
    // this.api = environment.api;
  }
  
  // webpayCrearOrden(modelo: WebpayRequest):Observable<any>
  // {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');    
  //   return this.http.post(`${this.api}webpay`, modelo, { headers: headers }); 
  // }
  
  // webpayRespuesta(modelo: WebpayResponse): Observable<any>
  // {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post(`${this.api}webpay-respuesta`, modelo, { headers: headers }); 
  // }
}
