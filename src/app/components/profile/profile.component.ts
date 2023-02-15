import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usu: any;
  before: any;
  data1: any = {
    nombre: '',
    rut: '',
    curso: '',
    username: '',
  }
  data2: any = {
    nombre: '',
    rut: '',
    curso: '',
    username: '',
  }
  //inicio
  dataAlumnos: any = {
    nombre: '',
    rut: '',
    curso: '',
    username: '',
  };
  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda       
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Validamos que en la navegacion actual tenga extras       
        this.before = this.router.getCurrentNavigation()?.extras.state;
        this.dataAlumnos = this.before.dataNew;
        const [v1, v2] = this.dataAlumnos;
        // console.log(v1, v2)
        this.data1 = v1;
        this.data2 = v2;
      } else { this.router.navigate(["/home/profile"]) } // Si no tiene extra la navegacion actual navegar al login    
    });
  }

  ngOnInit() {
    this.usu = localStorage.getItem('usuario');
  }


}
