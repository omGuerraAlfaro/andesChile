import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usu:any;
  nombreCurso:any;
  constructor() { }

  ngOnInit() {
    this.usu = localStorage.getItem('usuario');
    this.nombreCurso = localStorage.getItem('nombre_curso');
    console.log(this.usu);
    console.log(this.nombreCurso);
  }

  
}
