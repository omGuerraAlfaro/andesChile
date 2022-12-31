import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlumnoInterface } from 'src/interfaces/alumnoInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoalumnosService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'AccessControlAllowOrigin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    const alumnos = this.http.get<AlumnoInterface[]>(
      'https://nancyb3a.github.io/Test/usuarios_PGY4121_04.json'
    );
    return alumnos;
  }
}
