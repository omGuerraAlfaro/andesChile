import { Component, OnInit } from '@angular/core';
import { InfoApoderadoService } from './services/apoderadoService/infoApoderado.service';
import { IApoderado } from 'src/interfaces/apoderadoInterface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  apoderado: IApoderado | undefined;

  constructor(private infoApoderadoService: InfoApoderadoService) { }

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    const rut = localStorage.getItem('rut'); // Asumiendo que el RUT se guarda en localStorage
    if (rut) {
      this.infoApoderadoService.getInfoApoderado(rut).subscribe({
        next: (datosApoderado) => {
          this.apoderado = datosApoderado;
          // Aquí puedes realizar acciones adicionales con los datos obtenidos
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
