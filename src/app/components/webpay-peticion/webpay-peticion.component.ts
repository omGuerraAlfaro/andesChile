import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { firstValueFrom } from 'rxjs';
import { WebpayService } from 'src/app/services/webpay.service';

@Component({
  selector: 'app-webpay-peticion',
  templateUrl: './webpay-peticion.component.html',
  styleUrls: ['./webpay-peticion.component.scss'],
})
export class WebpayPeticionComponent implements OnInit {
  url = 'https://webpay3gint.transbank.cl/webpayserver/initTransaction';
  dataPago!: any[]; // Asegúrate de que sea un array
  suma: number = 0; // Para almacenar la suma total
  idBoleta: number = 0;
  numeroFormateado: string = ''; // Para el número formateado

  constructor(private webpayService: WebpayService, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.dataPago = navigation.extras.state['dataPago'];
        console.log(this.dataPago);
        //aqui guardar el id de las boletas para cambiar estado segun respuesta de webpay.
        this.idBoleta = this.dataPago[0].id;
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

  async goPagar(): Promise<void> {
    const rutApoderadoAmbiente = localStorage.getItem('rutAmbiente');
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();    
    const longitudDeseada = 6;
    const buyOrderId = rutApoderadoAmbiente + "-" + uuid.substring(0, longitudDeseada) + '-' + this.idBoleta;
  
    const data = {
      "amount": this.suma,
      "buyOrder": buyOrderId,
      "sessionId": rutApoderadoAmbiente!.toString(),
      "returnUrl": "https://www.colegioandeschile.cl/webpay-respuesta"
    };
  
    try {
      const response = await firstValueFrom(this.webpayService.webpayCrearOrden(data));
      if (response) {
        console.log(response);
        // Usando Capacitor Browser para abrir la URL
        await Browser.open({ url: `${response.url}?token_ws=${response.token}` });
        // Navega de vuelta a la home después de realizar la operación
        this.router.navigate(["/home"]);
      } else {
        console.error('No se recibió respuesta de la API de Webpay.');
      }
    } catch (error) {
      console.log(error);
    }
  }

}
