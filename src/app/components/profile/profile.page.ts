import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoApoderadoService } from 'src/app/services/infoApoderado.service';
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
  dataAlumnos!: IEstudiante[];
  students: IEstudiante[] = [];
  selectedStudent?: number;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private infoApoderadoService: InfoApoderadoService,
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
        this.selectedStudent = this.students[0]?.id;
      },
      error: (error) => {
        console.error("Error in component:", error);
      }
    });
  }

  onStudentSelected(studentId: number) {
    this.selectedStudent = studentId;
    this.cdr.detectChanges(); // Forzar la detección de cambios
    this.onStudentChange();
  }

  onStudentChange() {
    console.log(this.selectedStudent);

    // ... tu código para manejar el cambio
  }
}
