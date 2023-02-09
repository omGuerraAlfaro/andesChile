import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApoderadoInterface } from 'src/interfaces/apoderadoInterface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getApoderados(): Observable<any> {
    const apoderados = this.http.get<ApoderadoInterface[]>(environment.auth);
    return apoderados;
  }
}
