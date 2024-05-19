import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { AlertController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { WebpayService } from 'src/app/services/webpay.service';

@Component({
  selector: 'app-webpay-peticion',
  templateUrl: './webpay-peticion.component.html',
  styleUrls: ['./webpay-peticion.component.scss'],
})
export class WebpayPeticionComponent implements OnInit {
  dataPago!: any[];
  suma: number = 0;
  idBoleta: string = '';
  numeroFormateado: string = '';
  metodoPago: string = 'transferencia';
  correo: string = '';

  constructor(
    private webpayService: WebpayService,
    private activeroute: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
  ) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.dataPago = navigation.extras.state['dataPago'];
        // console.log(this.dataPago);

        this.idBoleta = this.dataPago.map(item => item.id).join('-');
      } else {
        this.router.navigate(["/home/finance"]);
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
    // console.log(this.numeroFormateado);
  }

  async goPagar(): Promise<void> {
    if (this.metodoPago === 'webpay') {
      await this.pagarConWebpay();
    } else if (this.metodoPago === 'transferencia') {
      await this.pagarConTransferencia();
    }
  }

  async pagarConWebpay(): Promise<void> {
    const rutApoderadoAmbiente = localStorage.getItem('rutAmbiente');
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    const longitudDeseada = 4;
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
        await Browser.open({ url: `${response.url}?token_ws=${response.token}` });
        this.router.navigate(["/home"]);
      } else {
        console.error('No se recibió respuesta de la API de Webpay.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async pagarConTransferencia(): Promise<void> {
    if (!this.correo) {
      this.presentToast('Por favor, proporciona un correo electrónico para la confirmación.');
      return;
    }

    this.presentAlertConfirm("Pregunta", `¿Estas seguro/a de esta acción?`);
  }

  async copiarDatosTransferencia(): Promise<void> {
    const datos = `Banco: Scotiabank
      Cuenta Corriente N°: 58011401
      Titular: Sociedad Educacional Alfredo Gallegos Avila E.I.R.L
      RUT: 77.625.500-9
      Correo: agustingallegos.aga@gmail.com
    `;
    await Clipboard.write({
      string: datos
    });
    this.presentToast('Datos de transferencia copiados con exito!!');
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000,
      position: 'top',
    });
    toast.present();
  }

  async presentAlertConfirm(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            console.log('Alert Cancelled');
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.presentAlertOK("Información", `Tu solicitud de pago será revisada por el departamento de finanzas. Ellos confirmarán el pago de las boletas seleccionadas (<b>N° ${this.idBoleta}</b>) por un monto de <b>$ ${this.numeroFormateado}</b> y te enviarán un correo con el comprobante de pago a <b>${this.correo}</b> dentro de las próximas 24 horas.`);
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertOK(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message: '',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(["/home"]);
          },
        },
      ],
    });
    alert.message = message;
    await alert.present();
  }

}
