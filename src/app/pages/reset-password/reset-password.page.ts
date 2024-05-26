import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { SendemailService } from 'src/app/services/correoService/sendemail.service';
import { AlumnoInterface } from 'src/interfaces/alumnoInterface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  user = {
    usuario: '',
    rut: '',
    email: ''
  };

  field!: string;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private sendEmail: SendemailService,
    public toastController: ToastController) { }

  ngOnInit() {
  }



  enviarCorreo() {
    if (!this.validateModel(this.user)) {
      this.presentToast('Falta ingresar ' + this.field, 3000);
    } else {
      console.log("CORREO");
      this.presentAlert2("ENVIADO", "Se ha enviado un link de recuperación al correo:" + `<br>` + this.user.email)
      //enviar correo...
    };
  }

  // this.clienteSession.forEach((element: any) => {
  //   const { username, password, nombre, rut } = element;
  //   if (this.user.usuario === username && this.user.rut === rut) {
  //     //envio de mail
  //     if (this.user.email != "") {
  //       this.sendEmail.sendEmail(this.user.email);

  //     } else {
  //       this.presentToast('El usuario y/o RUT ingresados son invalidos', 3000);
  //       this.presentAlert("ERROR", "Debe ingresar su correo institucional")
  //     }
  //   }
  // });

  // async presentAlert(titulo: string, msg: string) {
  //   const alert = await this.alertController.create({
  //     header: titulo,
  //     message: msg,
  //     buttons:
  //       [
  //         {
  //           text: 'Ok',
  //           role: 'confirm',
  //           cssClass: 'alert-button-confirm',
  //           handler: (role) => {
  //             console.log('confirmacion', role);
  //           },
  //         },
  //       ],
  //   });
  //   await alert.present();
  // }


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


  validateModel(model: any) {
    //recorro todas las entradas que me entrega el Object entries y obtengo
    //su clave-valor
    for (const [key, value] of Object.entries(model)) {
      //verifico campo vacío
      if (value === '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  //toast
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }


}
