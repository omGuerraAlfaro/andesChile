import { Component, OnInit } from '@angular/core';
import { WebpayRequest } from '../../../interfaces/webpay_request';
import { WebpayService } from '../../services/webpay.service';

@Component({
  selector: 'app-webpay',
  templateUrl: './webpay.component.html',
  styleUrls: ['./webpay.component.scss'],  
})
export class WebpayComponent implements OnInit {
  token: string | undefined;
  url: string | undefined;
  constructor(private webpayService: WebpayService) { }
  
  ngOnInit(): void { 
    let modelo:WebpayRequest={amount:10000};
    this.hacerPeticion(modelo);
  }
  hacerPeticion(modelo:WebpayRequest)
  {
    this.webpayService.webpayCrearOrden(modelo).subscribe(
      response=>
      {
        this.token=response.token;
        this.url=response.url;
      },
      error=>
      {
        console.log(error);
      }
    );
  }
}
