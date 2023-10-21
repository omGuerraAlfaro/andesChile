import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const body = {
      username,
      password
    };

    return this.http.post<ILoginResponse>(`${environment.api}/auth/login`, body);
  }

}
