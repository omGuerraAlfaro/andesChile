import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoApoderadoService } from 'src/app/services/apoderadoService/infoApoderado.service';
import { EstudianteService } from 'src/app/services/estudianteService/estudiante.service';
import { IApoderado, IEstudiante } from 'src/interfaces/apoderadoInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usu: any;
  extras: any;
  rutAmbiente: string = '';
  dataAlumnos: IEstudiante[] = [];
  students: IEstudiante[] = [];
  selectedStudent?: string;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private infoApoderadoService: InfoApoderadoService,
    private estudianteService: EstudianteService,
    private cdr: ChangeDetectorRef,
  ) {
    // Se mantiene tu lógica de suscripción a los queryParams
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.extras = this.router.getCurrentNavigation()?.extras.state;
        console.log(this.extras.user);
        this.rutAmbiente = this.extras.user.rut;
        this.cargarDatosApoderado(this.rutAmbiente); // Llamada a función para cargar datos
        localStorage.setItem('rutApoderado', this.rutAmbiente); // Guarda el RUT en localStorage
      } else {
        // Cargar el RUT desde localStorage si no hay estado de navegación
        this.rutAmbiente = localStorage.getItem('rutApoderado') || '';
        if (this.rutAmbiente) {
          this.cargarDatosApoderado(this.rutAmbiente); // Llamada a función para cargar datos
        } else {
          this.router.navigate(["/login"]); // Redirige al login si no hay RUT
        }
      }
    });
  }

  ngOnInit() {
    // Tu lógica para manejar 'usuario' aquí en ngOnInit si es necesario
    this.usu = localStorage.getItem('usuario');
  }

  private cargarDatosApoderado(rut: string) {
    const rutAmbiente = localStorage.getItem('rutAmbiente');
    if (!rutAmbiente) {
      console.error('No guardian RUT found in localStorage');
      return;
    }
    this.infoApoderadoService.getInfoApoderado(rutAmbiente).subscribe({
      next: (data: IApoderado) => {
        console.log(data.estudiantes);
        this.dataAlumnos = data.estudiantes;
        this.students = data.estudiantes;
        this.selectedStudent = this.students[0]?.rut.toString();
        this.onStudentChange(this.selectedStudent);
      },
      error: (error) => {
        console.error("Error in component:", error);
      }
    });
  }

  onStudentSelected(studentId: string) {
    this.selectedStudent = studentId;
    this.cdr.detectChanges(); // Forzar la detección de cambios
    this.onStudentChange(this.selectedStudent);
  }

  onStudentChange(rutInicial: string) {
    if (rutInicial) {
      this.selectedStudent = rutInicial;
      console.log(this.selectedStudent);
      this.estudianteService.getInfoEstudiante(this.selectedStudent).subscribe({
        next: (data: IEstudiante) => {
          // console.log(data);
          this.dataAlumnos = [data];
          this.estudianteService.setCurrentStudent(data);
        },
        error: (error) => {
          console.error("Error in component:", error);
        }
      });
      this.router.navigate(['home/profile/student', this.selectedStudent]);
    }
  }


}
