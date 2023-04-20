import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  dataUser(email_user: string, password: string) {
    return this.http.post<any>(environment.api + '/users/login', {email_user, password});
  }
}
