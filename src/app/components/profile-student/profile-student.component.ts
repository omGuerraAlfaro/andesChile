import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudianteService/estudiante.service';
import { IEstudiante } from 'src/interfaces/apoderadoInterface';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss'],
})
export class ProfileStudentComponent implements OnInit {

  student: IEstudiante | null = null; // Cambiado de un arreglo a un solo objeto que puede ser nulo

  constructor(private route: ActivatedRoute, private estudianteService: EstudianteService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Obtiene el RUT del estudiante desde la URL
      const rut = params.get('id');
      if (rut) {
        this.estudianteService.getInfoEstudiante(rut).subscribe({
          next: (dataStudent: IEstudiante) => {
            this.student = dataStudent; // Asigna directamente el estudiante a la variable
            console.log(dataStudent); // Muestra los datos del estudiante en la consola
          },
          error: (error) => {
            console.error('Error fetching student data:', error); // Manejar el error aquí
          }
        });
      }
    });
  }
}
