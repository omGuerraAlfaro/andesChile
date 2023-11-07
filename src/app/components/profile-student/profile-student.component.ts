import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EstudianteService } from 'src/app/services/estudianteService/estudiante.service';
import { IEstudiante } from 'src/interfaces/apoderadoInterface';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss'],
})
export class ProfileStudentComponent implements OnInit {
  student: IEstudiante | null = null;

  constructor(private route: ActivatedRoute, private estudianteService: EstudianteService, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const rut = params.get('id');
      if (rut) {
        this.estudianteService.getInfoEstudiante(rut).subscribe({
          next: (dataStudent: IEstudiante) => {
            this.student = dataStudent;
            console.log(dataStudent);
          },
          error: (error) => {
            console.error('Error fetching student data:', error);
          }
        });
      }
    });
    this.menuCtrl.enable(true);
  }
}
