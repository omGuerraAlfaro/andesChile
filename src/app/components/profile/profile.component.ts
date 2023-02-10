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

    console.log(this.usu);
  }

  
}
