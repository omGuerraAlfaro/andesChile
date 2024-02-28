import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebpayResponse } from '../../../interfaces/webpay_response';
import { WebpayRespuesta } from '../../../interfaces/webpay_respuesta';
import { WebpayService } from 'src/app/services/webpay.service';


@Component({
  selector: 'app-webpay-respuesta',
  templateUrl: './webpay-respuesta.component.html',
  styleUrls: ['./webpay-respuesta.component.css']
})
export class WebpayRespuestaComponent implements OnInit {

  constructor(private webpayService: WebpayService, private route: ActivatedRoute) { }
  modelo!:WebpayResponse;
  webpay_respuesta!:WebpayRespuesta;

  ngOnInit(): void {
    let params:any= this.route.snapshot.queryParams;
    this.modelo = {token: params.token, url: params.url};
    this.hacerPeticion(this.modelo);
  }
  hacerPeticion(modelo:WebpayResponse){
    this.webpayService.webpayRespuesta(modelo).subscribe(
      {
        next:(data: any)=>{
          this.webpay_respuesta=data;
        },
        error: (error: any) =>{
          console.log(error);
        }
      });
  }
}
