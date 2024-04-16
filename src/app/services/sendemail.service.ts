import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  constructor(private http: HttpClient) { }

  sendEmail(mail: string) {
    const url = 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send';
  
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'aa30792dd1msh887fd12e8ce88e2p15d195jsn67ea293b97a8',
      'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
      'Content-Type': 'application/json'
    });
  
    const payload = {
      personalizations: [
        {
          to: [
            {
              email: mail
            }
          ],
          subject: 'Cambio de contraseña'
        }
      ],
      from: {
        email: 'PasswordRecover@andesChile.com'
      },
      content: [
        {
          type: 'text/plain',
          value: 'Su contraseña es xxxxxxxxxx'
        }
      ]
    };
  
    return this.http.post(url, payload, { headers });
  }




}
