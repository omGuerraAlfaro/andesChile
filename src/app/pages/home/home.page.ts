import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, public alertController: AlertController) { }

  segmentChanged($event: any) {
    let direccion = $event.detail.value;
    console.log(direccion);
    if (direccion === "home"){
      this.router.navigate(['home/']);
    }
    else{
      this.router.navigate(['home/' + direccion]);
    }
  }


  irhome() {
    this.presentAlert2("¿Está Seguro?", "¿Deseas cerrar sesión?")
    localStorage.setItem('username', '');
  }

  async presentAlert2(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'alert-button-cancel',
            handler: () => {
              console.log('Alerta Cancelada');
            },
          },
          {
            text: 'Si',
            role: 'confirm',
            cssClass: 'alert-button-confirm',
            handler: (role) => {
              console.log('confirmacion', role);
              localStorage.setItem('ingresado', 'false');
              localStorage.setItem('usuario', '');
              localStorage.setItem('email', '');
              localStorage.setItem('sede', '');
              localStorage.setItem('carrera', '');
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
