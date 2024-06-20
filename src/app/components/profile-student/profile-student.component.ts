import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { EstudianteService } from 'src/app/services/estudianteService/estudiante.service';
import { IEstudiante } from 'src/interfaces/apoderadoInterface';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss'],
})
export class ProfileStudentComponent implements OnInit {
  @ViewChild('popover') popover: any;
  isOpen = false;
  public attendanceData: number[] = [];  // Inicializar con un array vacío

  student: IEstudiante | null = null;

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private menuCtrl: MenuController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const rut = params.get('id');
      if (rut) {
        this.estudianteService.getInfoEstudiante(rut).subscribe({
          next: (dataStudent: IEstudiante) => {
            this.student = dataStudent;
            this.attendanceData = [80, 20];
            //this.getAttendanceData(rut);
          },
          error: (error) => {
            console.error('Error al obtener los datos del estudiante:', error);
          }
        });
      }
    });
    this.menuCtrl.enable(true);
  }

  // getAttendanceData(rut: string) {
  //   this.estudianteService.getAsistenciaEstudiante(rut).subscribe({
  //     next: (data: { porcentajeAsistencia: number, porcentajeInasistencia: number }) => {
  //       this.attendanceData = [data.porcentajeAsistencia, data.porcentajeInasistencia];
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener los datos de asistencia:', error);
  //     }
  //   });
  // }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  working() {
    this.presentAlertWorking("Funcionalidad en Desarrollo", "Disculpa las molestias pero pronto habilitaremos esta funcionalidad.");
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
