import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  validationLogin(name_user: string, password: string) {
    return this.http.post<any>(environment.api + '/auth/login', {name_user, password}, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error during login', error);
          return throwError(error);
        })
      );
  }
}
