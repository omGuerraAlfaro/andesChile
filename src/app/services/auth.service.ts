import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from 'src/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',      
    })
  };

  constructor(private http: HttpClient) { }
  
  iniciarSesion(username: string, password: string): Observable<ILoginResponse> {
    console.log("username", username);
    console.log("password", password);
    console.log("Iniciando sesión...");
    const body = { username, password };
    
    return this.http.post<ILoginResponse>(`${environment.api}/auth/login`, body, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Status code:', error.status);
    console.error('Error:', error.error);
    console.error('Error message:', error.message);
    return throwError(() => new Error('Error en la autenticación'));
  }
  

}
