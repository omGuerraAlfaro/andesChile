import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InfoApoderadoService } from './services/apoderadoService/infoApoderado.service';
import { IApoderado } from 'src/interfaces/apoderadoInterface';
import { domain } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  apoderado: IApoderado | undefined;

  constructor(private infoApoderadoService: InfoApoderadoService, private router: Router) {
    this.initializeDeepLinks();

  }

  ngOnInit() {
    this.obtenerDatosUsuario();
    console.log("initializeDeepLinks");

  }
  initializeDeepLinks(): void {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      console.log('App opened with URL:', event.url);
      const domain = "colegioandeschile.cl";
      const pathArray = event.url.split(domain);

      const appPath = pathArray.pop();
      if(appPath){
        this.router.navigateByUrl(appPath);
      }
    });
  }


  obtenerDatosUsuario() {
    const rut = localStorage.getItem('rutApoderado'); // Asumiendo que el RUT se guarda en localStorage
    if (rut) {
      this.infoApoderadoService.getInfoApoderado(rut).subscribe({
        next: (datosApoderado) => {
          this.apoderado = datosApoderado;
          console.log(this.apoderado);
          // Aquí desplegar modal informativo con los nombres de cada apoderado..
        },
        error: (error) => {
          console.error('Error al obtener la información del apoderado:', error);
          // Implementa tu lógica de manejo de errores
        }
      });
    } else {
      // Manejo de la situación en la que no se encuentra el RUT
      console.log('No se encontró el RUT del apoderado en localStorage.');
      // Posiblemente redirigir al usuario a iniciar sesión
    }
  }

}
