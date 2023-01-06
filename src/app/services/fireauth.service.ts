import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private firestore: AngularFirestore) { }

  createDoc() {
    this.firestore.collection('asignatura')
  }

  getColletcion() {
    return this.firestore.collection('asignatura').snapshotChanges()
  }

  // createDoc2() {
  //   this.firestore.collection('clases');
  // }
  // getCollection2() {
  //   return this.firestore.collection('clases').snapshotChanges();
  // }

  // insertColectionAsignatura(data: any, user: string, fecha: string) {
  //   const { idlottie, totalclases, seccion } = data;
  //   user = user.replace('.', '');
  //   var usuario = user
  //   var codigo = user + data.asignatura + fecha
  //   const total = {
  //     code: data.code, idlottie, totalclases, seccion
  //   };
  //   return this.firestore.collection('clases').doc('asignaturas').collection(usuario).doc(codigo).set(data);
  // }
  
  // obtTotal(user: any, codigo: any) {
  //   return this.firestore.collection('asistencia').doc(user).collection(codigo).doc('Total').snapshotChanges();
  // }

  // gettotal(user: any, codigo: any) {
  //   this.firestore.collection('asistencia').doc(user).collection(codigo).valueChanges((resultadoConsultaTareas) => {
  //     console.log(resultadoConsultaTareas.payload.total);

  //   });
  // }

  // insertTotal(user: any, codigo: any, total: any) {
  //   var Total = total
  //   return this.firestore.collection('asistencia').doc(user).collection(codigo).doc('Total').update({ Total });
  // }

  // contarAsistencia(user: any, codigo: any) {
  //   var total = 0;
  //   const cont = this.firestore.collection('asistencia').doc(user).collection(codigo).snapshotChanges().subscribe(element => {
  //     total = element.length - 1;
  //     this.insertTotal(user, codigo, total) // total 4 (works fine)
  //   })
  // }

  // getCollectionParams<tipo>(path: string, params: string, value: string) {
  //   const dataCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path
  //     , ref => ref.where(params, '==', value));
  //   return dataCollection.valueChanges();
  // }


}
