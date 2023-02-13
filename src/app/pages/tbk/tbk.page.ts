import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebpayService } from 'src/app/services/webpay.service';
import { WebpayRequest } from 'src/interfaces/webpay_request';

@Component({
  selector: 'app-tbk',
  templateUrl: './tbk.page.html',
  styleUrls: ['./tbk.page.scss'],
})
export class TbkPage {
  sumaBeforeArray: any;
  suma: any; //webpay data
  numeroFormateado: any;
  before: any;
  dataPago: any = {
    id: '',
    detail: '',
    expirationDate: '',
    mount: ''
  };

  // token?: string;
  // url?: string;
  constructor(private webpayService: WebpayService, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda       
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Validamos que en la navegacion actual tenga extras       
        this.before = this.router.getCurrentNavigation()?.extras.state;
        this.dataPago = this.before.dataPago;
        this.sumaBeforeArray = this.dataPago.map(
          (item: { mount: any; }) => item.mount
        );

        console.log(this.dataPago) // Muestra por consola lo enviado     
      } else { this.router.navigate(["/home/finance"]) } // Si no tiene extra la navegacion actual navegar al login    
    });
  }

  ngOnInit(): void {
    this.suma = this.sumaBeforeArray.reduce((a: any, b: any) => a + b, 0); +
      console.log(this.suma);
      const formatter = new Intl.NumberFormat('cl-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      })

      this.numeroFormateado = formatter.format(this.suma);
      console.log(this.numeroFormateado);

    // let modelo:WebpayRequest={amount:10000};
    // this.hacerPeticion(modelo);
  }

  goPagar() {

  }

 


  // hacerPeticion(modelo:WebpayRequest)
  // {
  //   this.webpayService.webpayCrearOrden(modelo).subscribe(
  //     response=>
  //     {
  //       this.token=response.token;
  //       this.url=response.url;
  //     },
  //     error=>
  //     {
  //       console.error(error);
  //     }
  //   );
  // }

}
