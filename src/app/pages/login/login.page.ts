import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';
import { InfoalumnosService } from 'src/app/services/infoalumnos.service';
import { AlumnoInterface } from 'src/interfaces/alumnoInterface';
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
  clientAlumno!: AlumnoInterface[];

  constructor(private dataAlumnos: InfoalumnosService, private router: Router, public toastController: ToastController) { }



  ionViewWillEnter() {
    this.dataAlumnos.getApoderados().subscribe((data) => {
      //console.log(data);
      const { apoderados } = data;

      //Apoderado
      const dataApoderado = apoderados.flatMap(function (apoderado: { rut: any; nombre: any; username: any; password: any; estudiantes: any; }) {
        let apoderadoName = apoderado.nombre
        let apoderadoRut = apoderado.rut
        let apoderadoUsername = apoderado.username
        let apoderadoPassword = apoderado.password
        return {
          nombre: apoderadoName,
          username: apoderadoUsername,
          password: apoderadoPassword,
          rut: apoderadoRut
        }
      });
      console.log("apoderado", dataApoderado);
      this.clienteSession = dataApoderado;

      const dataAlumno = apoderados.flatMap(function (apoderado: { rut: any; nombre: any; username: any; password: any; estudiantes: any; }) {
        let usernameFK = apoderado.username;
        return apoderado.estudiantes.map(function (estudiante: { nom_estudiante: any; rut_estudiante: any; curso: any; }) {
          return {
            nombreEstudiante: estudiante.nom_estudiante,
            rutEstudiante: estudiante.rut_estudiante,
            nombreCurso: estudiante.curso,
            usernameFK: usernameFK
          }
        });
      });
      console.log("alumno", dataAlumno);
      this.clienteSession = dataApoderado;
      this.clientAlumno = dataAlumno;
    });
  }


  ingresar() {
    if (!this.validateModel(this.user)) {
      if (this.field === 'password'){
        this.field = 'contraseña';        
      }
      this.presentToast('Falta ingresar ' + this.field, 3000);
    } else {
      const dataNew = this.clientAlumno.filter((apo: any) => this.user.usuario === apo.usernameFK)
      console.log(dataNew);
      this.clienteSession.forEach((element: any) => {
        const { username, password, nombre, rut } = element;
        
        if (this.user.usuario === username && this.user.password === password) {
          //authguard
          localStorage.setItem('ingresado', 'true');
          //apoderado 
          localStorage.setItem('usuario', nombre.toLowerCase());
          localStorage.setItem('username', username);
          localStorage.setItem('rut_apoderado', rut);

          // Se declara e instancia un elemento de tipo NavigationExtras
          const navigationExtras: NavigationExtras = {
            state: {
              user: this.user,
              dataNew: dataNew
            },
          };
          this.router.navigate(['/home/profile'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
          return;
        }
        if (this.user.usuario != username && this.user.password != password) {
          this.presentToast('El usuario y/o contraseña son invalidas', 3000);
        }        
      });
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
