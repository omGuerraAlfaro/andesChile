import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IApoderado, IApoderadoAlone } from 'src/interfaces/apoderadoInterface';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/interfaces/login.interface';

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

  getInfoApoderado(rut: any): Observable<IApoderado> {
    return this.http.get<IApoderado>(`${environment.api}/apoderado/${rut}/with-estudents`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getInfoApoderadoAlone(rut: any): Observable<IApoderadoAlone> {
    return this.http.get<IApoderadoAlone>(`${environment.api}/apoderado/rut/${rut}`, this.httpOptions)
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

  getUser(rut: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.api}/usuarios/rut/${rut}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.patch<any>(`${environment.api}/usuarios/change/${userId}`, { oldPassword, newPassword, confirmPassword }, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateApoderado(id: number, apoderadoData: IApoderadoAlone): Observable<IApoderadoAlone> {
    return this.http.put<IApoderadoAlone>(`${environment.api}/apoderado/${id}`, apoderadoData)
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
