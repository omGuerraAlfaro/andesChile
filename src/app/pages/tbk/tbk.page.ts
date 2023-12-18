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
  dataPago!: any[]; // Asegúrate de que sea un array
  suma: number = 0; // Para almacenar la suma total
  numeroFormateado: string = ''; // Para el número formateado

  constructor(private webpayService: WebpayService, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.dataPago = navigation.extras.state['dataPago'];
        console.log(this.dataPago); // Muestra por consola lo enviado
      } else {
        this.router.navigate(["/home/finance"]); // Redirige si no hay datos
      }
    });
  }

  ngOnInit(): void {
    this.suma = this.dataPago.reduce((acc, item) => acc + Number(item.mount), 0);
    const formatter = new Intl.NumberFormat('cl-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    });
    this.numeroFormateado = formatter.format(this.suma);
    console.log(this.numeroFormateado);
  }

  goPagar(): void {
    // Lógica de pago
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
