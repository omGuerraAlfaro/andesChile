import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  constructor() { }

  sendEmail(mail: String) {
    try {
      const response = fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': '010476f643msha15ff586936f4f0p1eeccdjsne4d90f359c5d',
          'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
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
        })
      });
    } catch (err) {
      console.error(err);
    }
  }


  sendEmailScanner(username: String, nombreProfe: String, correoProfesor: String, fecha: Date) {  
    try {
      const response = fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': '010476f643msha15ff586936f4f0p1eeccdjsne4d90f359c5d',
          'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email: correoProfesor
                }
              ],
              subject: 'Confirmación de Asistencia Alumno ' + `${username}`
            }
          ],
          from: {
            email: 'ConfirmacionAsistencia@Registrapp.com'
          },
          content: [
            {
              type: 'text/plain',
              value: 'Estimado Profesor/a: ' + `${nombreProfe}` + 'El Alumno ' + `${username}` + ' Registró su asistencia el dia ' + `${fecha}`
            }
          ]
        })
      });
      console.log('Se en vio correo');
      
    } catch (err) {
      console.error(err);
    }
  }



}
