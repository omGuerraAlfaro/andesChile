import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InfoApoderadoService } from './services/apoderadoService/infoApoderado.service';
import { IApoderado } from 'src/interfaces/apoderadoInterface';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  apoderado: IApoderado | undefined;

  constructor(private infoApoderadoService: InfoApoderadoService, private router: Router, private platform: Platform) {
    this.initializeDeepLinks();

  }

  ngOnInit() {
    this.obtenerDatosUsuario();
    console.log("initializeDeepLinks");

  }
  initializeDeepLinks(): void {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const rut = localStorage.getItem('rutApoderado');
      if(rut){
        this.router.navigateByUrl(`/home/profile/student/${rut}`);
      }
    });
    this.platform.ready().then(() => {
      const rut = localStorage.getItem('rutApoderado');
      if(rut){
        this.router.navigateByUrl(`/home/profile/student/${rut}`);  
      }
    });
    
  }
  
  
  obtenerDatosUsuario() {
    const rut = localStorage.getItem('rutApoderado');
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
