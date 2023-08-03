import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/models/login.model';
import { TokenModel } from 'src/models/token.model';
import { UserModel } from 'src/models/user.model';


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

  userData!: UserModel;
  userDataToken!: TokenModel;

  constructor(private router: Router, public toastController: ToastController, private auth: AuthService) { }

  ingresar() {
    if (!this.validateModel(this.user)) {
      if (this.field === 'password') {
        this.field = 'contraseña';
      }
      this.presentToast('Falta ingresar ' + this.field, 3000);
    } else {

      this.auth.validationLogin(this.user.usuario, this.user.password).subscribe((loginData: LoginModel) => {
        this.userData = loginData.user;
        this.userDataToken = loginData.token;
        console.log(this.userData);
        const { name_user, password, email_user } = this.userData;
        const { token } = this.userDataToken;
        if (this.user.usuario === name_user && this.user.password === password) {
          //authguard
          localStorage.setItem('ingresado', 'true');
          //apoderado 
          localStorage.setItem('usuario', name_user.toLowerCase());
          localStorage.setItem('username', name_user);
          localStorage.setItem('email', email_user);
          localStorage.setItem('token', token);
          // localStorage.setItem('rut_apoderado', rut);

          // Se declara e instancia un elemento de tipo NavigationExtras
          const navigationExtras: NavigationExtras = {
            state: {
              user: this.user,
              // dataNew: dataNew
            },
          };
          this.router.navigate(['/home/profile'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
          return;
        }
        if (this.user.usuario != name_user && this.user.password != password) {
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
