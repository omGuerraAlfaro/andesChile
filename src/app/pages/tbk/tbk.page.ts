import { Component, OnInit } from '@angular/core';
import { WebpayService } from 'src/app/services/webpay.service';
import { WebpayRequest } from 'src/interfaces/webpay_request';

@Component({
  selector: 'app-tbk',
  templateUrl: './tbk.page.html',
  styleUrls: ['./tbk.page.scss'],
})
export class TbkPage{

  token: string | undefined;
  url: string | undefined;
  constructor(private webpayService: WebpayService) { }
  
  // ngOnInit(): void { 
  //   let modelo:WebpayRequest={amount:10000};
  //   this.hacerPeticion(modelo);
  // }
  
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
