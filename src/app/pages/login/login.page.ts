import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { log } from 'console';
import { AuthService } from 'src/app/services/auth.service';
import { ILoginResponse } from 'src/interfaces/login.interface';
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

  ingresar(): void {
    console.log(this.user);
    if (!this.validateModel(this.user)) {
      this.field = (this.field === 'password') ? 'contraseña' : this.field;
      this.presentToast('Falta ingresar ' + this.field, 3000);
      return; // Regresamos de la función si el modelo no es válido
    }

    this.auth.iniciarSesion(this.user.usuario, this.user.password).subscribe((loginData: ILoginResponse) => {
      if (loginData && loginData.token) {
          this.userData = loginData.user;
          const { username, correo_electronico } = this.userData;
          const token = loginData.token;
  
          this.saveUserDataToLocalStorage(username, correo_electronico, token);
          this.navigateToProfile();
      } else {
          this.presentToast('El usuario y/o contraseña son inválidos', 3000);
      }
  }, error => {
      console.error("Error en el inicio de sesión:", error);
      this.presentToast('Error al intentar iniciar sesión. Inténtalo de nuevo.', 3000);
  });
  

  }

  private saveUserDataToLocalStorage(name_user: string, email_user: string, token: string): void {
    localStorage.setItem('ingresado', 'true');
    localStorage.setItem('usuario', name_user);
    localStorage.setItem('username', name_user);
    localStorage.setItem('email', email_user);
    localStorage.setItem('token', token);
  }

  private navigateToProfile(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/home/profile'], navigationExtras);
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
