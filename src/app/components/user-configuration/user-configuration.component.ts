import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { InfoApoderadoService } from 'src/app/services/apoderadoService/infoApoderado.service';
import { IApoderado, IApoderadoAlone } from 'src/interfaces/apoderadoInterface';
import { OverlayEventDetail } from '@ionic/core/components';
import { IUser } from 'src/interfaces/login.interface';
import { log } from 'console';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss'],
})
export class UserConfigurationComponent implements OnInit {
  @ViewChild('editModal') editModal!: IonModal;
  @ViewChild('passwordModal') passwordModal!: IonModal;

  userData: IApoderadoAlone | undefined;
  editData: IApoderadoAlone | undefined;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPasswordInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private apoderadoService: InfoApoderadoService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const rut = params.get('id');
      if (rut) {
        this.apoderadoService.getInfoApoderadoAlone(rut).subscribe({
          next: (dataUser: IApoderadoAlone) => {
            console.log(dataUser);
            this.userData = dataUser;
            this.editData = { ...this.userData }; // Clonar datos para editar
            console.log(this.userData);
          },
          error: (error) => {
            console.error('Error al obtener los datos del estudiante:', error);
          }
        });
      }
    });
  }

  formatRut(rut: string): string {
    return rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  openEditModal() {
    this.editModal.present();
  }

  openPasswordModal() {
    this.passwordModal.present();
  }

  cancelEdit() {
    this.editModal.dismiss(null, 'cancel');
  }

  async confirmEdit() {
    if (this.editData && this.editData.id) {
      this.apoderadoService.updateApoderado(this.editData.id, this.editData).subscribe({
        next: (updatedData: IApoderadoAlone) => {
          this.userData = updatedData;
          this.editModal.dismiss();
          console.log('Datos actualizados:', updatedData);
        },
        error: (error) => {
          console.error('Error al actualizar los datos:', error);
          this.presentAlert('Error', 'Hubo un problema al actualizar los datos. Inténtalo de nuevo.');
        }
      });
    }
  }

  cancelPassword() {
    this.passwordModal.dismiss(null, 'cancel');
  }

  confirmPassword() {
    if (!this.isPasswordValid(this.newPassword)) {
      console.error('La nueva contraseña no cumple con los requisitos');
      this.presentAlert('Error', 'La nueva contraseña debe ser alfanumérica y tener al menos 8 caracteres.');
      return;
    }

    if (this.newPassword !== this.confirmPasswordInput) {
      console.error('Las contraseñas no coinciden');
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    this.passwordModal.dismiss({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPasswordInput
    }, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<any>>;
    if (ev.detail.role === 'confirm' && ev.detail.data) {
      this.editData = ev.detail.data;
      this.confirmEdit();
    }
  }

  onWillDismissPassword(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<{ oldPassword: string, newPassword: string, confirmPassword: string }>>;

    if (ev.detail.role === 'confirm' && ev.detail.data) {
      const { newPassword, confirmPassword, oldPassword } = ev.detail.data;

      if (newPassword === confirmPassword) {
        const rut = this.userData?.rut;
        if (rut) {
          console.log('RUT del usuario:', rut);

          this.apoderadoService.getUser(rut).subscribe({
            next: (users: IUser[]) => {
              if (users.length > 0) {
                const user = users[0];
                console.log('Usuario encontrado:', user);

                if (user.id !== undefined) {
                  this.apoderadoService.updatePassword(user.id, oldPassword, newPassword, confirmPassword)
                    .subscribe({
                      next: response => {
                        console.log('Contraseña actualizada correctamente:', response);
                        this.presentAlert('Éxito', 'Contraseña actualizada correctamente.');
                      },
                      error: error => {
                        console.error('Error al actualizar la contraseña:', error);
                        this.presentAlert('Error', 'Hubo un problema al actualizar la contraseña.');
                      }
                    });
                } else {
                  console.error('Error: el ID del usuario es indefinido');
                  this.presentAlert('Error', 'El ID del usuario es indefinido.');
                }
              } else {
                console.error('Error: No se encontró ningún usuario con el RUT proporcionado');
                this.presentAlert('Error', 'No se encontró ningún usuario con el RUT proporcionado.');
              }
            },
            error: error => {
              console.error('Error al obtener el usuario:', error);
              this.presentAlert('Error', 'Hubo un problema al obtener el usuario.');
            }
          });
        } else {
          console.error('Error: el RUT del usuario es indefinido');
          this.presentAlert('Error', 'El RUT del usuario es indefinido.');
        }
      } else {
        console.error('Las contraseñas no coinciden');
        this.presentAlert('Error', 'Las contraseñas no coinciden.');
      }
    }
  }

  isPasswordValid(password: string): boolean {
    const hasAlphanumeric = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(password);
    const hasMinLength = password.length >= 8;
    return hasAlphanumeric && hasMinLength;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay']
    });

    await alert.present();
  }
}
