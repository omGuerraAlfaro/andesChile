import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usu:any;
  nombreCurso:any;
  nombreAlumno:any;
  rutEstudiante:any;
  constructor() { }

  ngOnInit() {
    this.usu = localStorage.getItem('usuario');
    this.nombreCurso = localStorage.getItem('nombre_curso');
    this.nombreAlumno = localStorage.getItem('nombre_estudiante');
    this.rutEstudiante = localStorage.getItem('rut_estudiante');
    console.log(this.usu);
    console.log(this.nombreCurso);
    console.log(this.nombreAlumno);
  }

  
}
