import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { WebpayService } from 'src/app/services/webpay.service';
import { WebpayRequest } from 'src/interfaces/webpay_request';
import { WebpayResponse } from 'src/interfaces/webpay_response';

@Component({
  selector: 'app-tbk',
  templateUrl: './tbk.page.html',
  styleUrls: ['./tbk.page.scss'],
})
export class TbkPage {
  url = 'https://webpay3gint.transbank.cl/webpayserver/initTransaction';
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

  async goPagar(): Promise<void> {
    const rutApoderadoAmbiente = localStorage.getItem('rutAmbiente');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    const contatOrderId = rutApoderadoAmbiente + "-" + uuid;

    const data = {
      "amount": this.suma,
      "buyOrder": contatOrderId,
      "sessionId": rutApoderadoAmbiente!.toString(),
      "returnUrl": "https://127.0.0.1:8100/tbk/webpay-respuesta"
    };

    try {
      const response = await firstValueFrom(this.webpayService.webpayCrearOrden(data));
      if (response) {
        console.log(response);
        this.submitForm(response.url, response.token);
      } else {
        console.error('No se recibió respuesta de la API de Webpay.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private submitForm(url: string, token: string): void {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.style.display = 'none';

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token_ws';
    tokenInput.value = token;

    form.appendChild(tokenInput);
    document.body.appendChild(form);

    form.submit();
  }

  goPagar2() {
    this.router.navigate(["/tbk/webpay-respuesta"]);
  }

}
