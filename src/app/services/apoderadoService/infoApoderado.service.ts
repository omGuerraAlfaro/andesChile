import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IApoderado } from 'src/interfaces/apoderadoInterface';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InfoApoderadoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getInfoApoderado(rut: string): Observable<IApoderado> {
    return this.http.get<IApoderado>(`${environment.api}/apoderado/${rut}/with-estudents`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getInfoBoletasApoderado(rut: any): Observable<any> {
    return this.http.get<any>(`${environment.api}/boleta/${rut}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred: ' + error.message;
    console.error(errorMessage);
    // Aquí podrías implementar una lógica adicional para manejar diferentes tipos de errores.
    return throwError(() => new Error(errorMessage));
  }
}
