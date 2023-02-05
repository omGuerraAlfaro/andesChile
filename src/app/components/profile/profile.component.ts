import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usu:any;
  email:any;
  sede:any;
  carrera:any;
  constructor() { }

  ngOnInit() {
    this.usu = localStorage.getItem('usuario');
    this.email = localStorage.getItem('email');
    this.sede = localStorage.getItem('sede');
    this.carrera = localStorage.getItem('carrera');

    console.log(this.usu);
    console.log(this.email);
    console.log(this.sede);
    console.log(this.carrera);
  }

}
