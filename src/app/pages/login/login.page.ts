import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';
import { InfoalumnosService } from 'src/app/services/infoalumnos.service';
import { ApoderadoInterface } from 'src/interfaces/apoderadoInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  //para guardar el input vacío
  field!: string;
  //inicio sesion
  existe: any;

  user = {
    usuario: '',
    password: '',
  };

  clienteSession!: ApoderadoInterface[];

  constructor(private dataAlumnos: InfoalumnosService, private router: Router, public toastController: ToastController) { }

  ionViewWillEnter() {
    this.dataAlumnos.getApoderados().subscribe((data) => {
      console.log(data);
      const { cursos } = data;
      //console.log(cursos.length);      
      const dataApoderado = cursos.map(function (cursos: { apoderados: any; }) {
        return cursos.apoderados;
      });
      //console.log(dataApoderado);           
      this.clienteSession = dataApoderado;


      console.log(this.clienteSession);
    });
  }


  ingresar() {
    //console.log(this.alumnos);
    if (!this.validateModel(this.user)) {
      this.presentToast('Falta ingresar ' + this.field, 3000);
    } else {

      for (let i = 0; i < this.clienteSession.length; i++) {
        
        console.log(this.clienteSession[i].username);
        console.log(this.clienteSession[i].password);        
        if
          (
          this.user.usuario === this.clienteSession[i].username && this.user.password === this.clienteSession[i].password
        ) {
          console.log('valid');
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('usuario', this.clienteSession[i].nombre.toLowerCase());
          localStorage.setItem('email', this.clienteSession[i].username + '@duocuc.cl');
          localStorage.setItem('username', this.clienteSession[i].username);
          localStorage.setItem('sede', 'Viña del Mar');
          localStorage.setItem('carrera', 'Ing Informatica');
          // Se declara e instancia un elemento de tipo NavigationExtras
          const navigationExtras: NavigationExtras = {
            state: {
              user: this.user, // Al estado se asignamos un objeto con clave y valor
            },
          };
          this.router.navigate(['/home/profile'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
          return;
        }
        console.log(this.clienteSession[i]);
        if (this.user.usuario !== this.clienteSession[i].username && this.user.password !== this.clienteSession[i].password) {
          this.presentToast('El usuario y/o contraseña son invalidas', 3000);
        }
      }
    };
  }

  recuperar() {
    this.router.navigate(['/resetpassword']);
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
