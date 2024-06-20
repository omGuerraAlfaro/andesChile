import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { InfoApoderadoService } from 'src/app/services/apoderadoService/infoApoderado.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  students: any[] = []; // Assuming that 'estudiantes' is an array
  selectedStudent: string = ''; // This will hold the ID of the selected student

  constructor(
    private router: Router,
    public alertController: AlertController,
    private infoApoderadoService: InfoApoderadoService
  ) { }

  ngOnInit() {
    this.loadStudents();
  }

  segmentChanged($event: any) {
    let direccion = $event.detail.value;
    console.log(direccion);
    if (direccion === "home") {
      this.router.navigate(['home/']);
    }
    else {
      this.router.navigate(['home/' + direccion]);
    }
  }

  loadStudents() {
    const rutAmbiente = localStorage.getItem('rutAmbiente');
    if (!rutAmbiente) {
      console.error('No guardian RUT found in localStorage');
      return;
    }

    // Here you subscribe to the service and update `this.students`
    this.infoApoderadoService.getInfoApoderado(rutAmbiente).subscribe({
      next: (data) => {
        this.students = data.estudiantes.map((estudiante: any) => {
          return {
            id: estudiante.id, // Or whatever unique identifier each student has
            name: estudiante.nombre // The name of the student
          };
        });
        // If you need to select a default student, you can do it here
        this.selectedStudent = this.students[0]?.id;
      },
      error: (error) => {
        console.error("Error loading students", error);
      }
    });
  }

  logout() {
    this.presentAlertConfirm("¿Está Seguro?", "¿Deseas cerrar sesión?");
  }

  working() {
    this.presentAlertWorking("Funcionalidad en Desarrollo", "Disculpa las molestias pero pronto habilitaremos esta funcionalidad.");
  }
  goConfigurationUsser() {
    const rut = localStorage.getItem('rutApoderado');
    if (rut) {
      this.router.navigate(['configuration/user/' + rut]);
    }
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
            localStorage.setItem('ingresado', 'false');
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            localStorage.removeItem('rutAmbiente');
            localStorage.removeItem('rutApoderado');
            localStorage.removeItem('email');
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertWorking(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Okay',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            console.log('Alert OK');
          },
        },
      ],
    });

    await alert.present();
  }
}
