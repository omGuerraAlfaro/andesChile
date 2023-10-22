import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoApoderadoService } from 'src/app/services/infoApoderado.service';
import { IApoderado, IEstudiante } from 'src/interfaces/apoderadoInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usu: any;
  extras: any;
  rutAmbiente: string = '';

  dataAlumnos!: IEstudiante[];

  constructor(private activeroute: ActivatedRoute, private router: Router, private infoApoderado: InfoApoderadoService) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda       
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Validamos que en la navegacion actual tenga extras       
        this.extras = this.router.getCurrentNavigation()?.extras.state;
        // Obtenemos los extras de la navegacion actual
        console.log(this.extras.user);
        // this.rutAmbiente = this.extras.user.rut;
        this.rutAmbiente = this.extras.user.rut;
        //llamada de servicio para obtener datos de alumnos por rut de apoderado
        this.infoApoderado.getInfoApoderado(this.rutAmbiente).subscribe({
          next: (data: IApoderado) => {
            console.log(data.estudiantes);
            this.dataAlumnos = data.estudiantes;   
          },
          error: (error) => {
            console.error("Error in component:", error);
          }
        });

      }
      // else { this.router.navigate(["/home/profile"]) } // Si no tiene extra la navegacion actual navegar al login    
    });
  }

  ngOnInit() {
    this.usu = localStorage.getItem('usuario');
  }


}
