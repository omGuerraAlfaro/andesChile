import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SendemailService } from 'src/app/services/sendemail.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  data: any = {
    email: "",
  }

  constructor(public alertController: AlertController, private router: Router, private sendEmail: SendemailService) { }

  ngOnInit() {
  }


//***************************************************************************************** */
  //faltaria recorrer los alumnos para verificar su existencia... agregar alert al caso...
//***************************************************************************************** */

  enviarCorreo() {
    if (this.data.email != "") {
      this.presentAlert2("ENVIADO", "Se ha enviado un link de recuperación al correo:" + `<br>` + this.data.email)
      this.sendEmail.sendEmail(this.data.email);

    } else {
      this.presentAlert("ERROR", "Debe ingresar su correo institucional")
    }
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'Ok',
            role: 'confirm',
            cssClass: 'alert-button-confirm',
            handler: (role) => {
              console.log('confirmacion', role);
            },
          },
        ],
    });
    await alert.present();
  }


  async presentAlert2(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'Ok',
            role: 'confirm',
            cssClass: 'alert-button-confirm',
            handler: (role) => {
              console.log('confirmacion', role);
            },
          },
        ],
    });
    await alert.present();
    let result = await alert.onDidDismiss(); //retorna la data del alert
    console.log(result);
    if (result.role == 'confirm') {
      this.router.navigate(['/login']);
    }
  }

}
