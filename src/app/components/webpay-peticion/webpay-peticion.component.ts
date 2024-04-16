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
  numeroFormateado: string = ''; // Para el número formateado

  constructor(private webpayService: WebpayService, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.dataPago = navigation.extras.state['dataPago'];
        console.log(this.dataPago);
        //aqui guardar el id de las boletas para cambiar estado segun respuesta de webpay.
        
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
    const longitudDeseada = 10;
    const contactOrderId = rutApoderadoAmbiente + "-" + uuid.substring(0, longitudDeseada);
  
    const data = {
      "amount": this.suma,
      "buyOrder": contactOrderId,
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

  // async goPagar(): Promise<void> {
  //   const rutApoderadoAmbiente = localStorage.getItem('rutAmbiente');
  //   const { v4: uuidv4 } = require('uuid');
  //   const uuid = uuidv4();    
  //   const longitudDeseada = 10;
  //   const contatOrderId = rutApoderadoAmbiente + "-" + uuid.substring(0, longitudDeseada);

  //   const data = {
  //     "amount": this.suma,
  //     "buyOrder": contatOrderId,
  //     "sessionId": rutApoderadoAmbiente!.toString(),
  //     "returnUrl": "https://www.colegioandeschile.cl/webpay-respuesta"
  //   };

  //   try {
  //     const response = await firstValueFrom(this.webpayService.webpayCrearOrden(data));
  //     if (response) {
  //       console.log(response);
  //       this.submitForm(response.url, response.token);
  //     } else {
  //       console.error('No se recibió respuesta de la API de Webpay.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // private submitForm(url: string, token: string): void {
  //   const form = document.createElement('form');
  //   form.method = 'POST';
  //   form.action = url;
  //   form.style.display = 'none';

  //   const tokenInput = document.createElement('input');
  //   tokenInput.type = 'hidden';
  //   tokenInput.name = 'token_ws';
  //   tokenInput.value = token;

  //   form.appendChild(tokenInput);
  //   document.body.appendChild(form);

  //   form.submit();
  //   this.router.navigate(["/home"]);
  // }

}
