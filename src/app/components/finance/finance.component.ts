import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {

  master: boolean = false;
  public form = [
    { id: "AC-001", detail: 'Matricula', select: false, mount: 200000, expirationDate: "05/02/2023" },
    { id: "AC-002", detail: 'Marzo', select: false, mount: 180000, expirationDate: "05/03/2023" },
    { id: "AC-003", detail: 'Abril', select: false, mount: 180000, expirationDate: "05/04/2023" },
    { id: "AC-004", detail: 'Mayo', select: false, mount: 180000, expirationDate: "05/05/2023" },
    { id: "AC-005", detail: 'Junio', select: false, mount: 180000, expirationDate: "05/06/2023" },
    { id: "AC-006", detail: 'Julio', select: false, mount: 180000, expirationDate: "05/07/2023" },
    { id: "AC-007", detail: 'Agosto', select: false, mount: 180000, expirationDate: "05/08/2023" },
    { id: "AC-008", detail: 'Septiembre', select: false, mount: 180000, expirationDate: "05/09/2023" },
    { id: "AC-009", detail: 'Octubre', select: false, mount: 180000, expirationDate: "05/10/2023" },
    { id: "AC-010", detail: 'Noviembre', select: false, mount: 180000, expirationDate: "05/11/2023" },
    { id: "AC-011", detail: 'Diciembre', select: false, mount: 180000, expirationDate: "05/12/2023" },
  ];
  

  constructor(private router: Router, public toastController: ToastController) {
    //service bd

  }

  ngOnInit() {

  }


  goPagar() {
    if (this.form.filter((d) => d.select).length === 0) {
      this.presentToast('Debe seleccionar almenos 1 cuota para pagar', 3000);
    }else{
      // Se declara e instancia un elemento de tipo NavigationExtras
    const navigationExtras: NavigationExtras = {
      state: {
        dataPago: this.form
          .filter((d) => d.select)
          .map((d) => ({ id: d.id, detail: d.detail, expirationDate: d.expirationDate, mount: d.mount })),
      },
    };
    this.router.navigate(['/tbk'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
    return;
    }
  }

  //checkbox
  onChange(event: any) {
    const id = event.detail.value;
    const isChecked = event.detail.checked;

    if (id === -1) {
      this.form = this.form.map((d) => ({ ...d, select: isChecked }));
    } else {
      this.form = this.form.map((d) =>
        d.id === id ? { ...d, select: isChecked } : d
      );
    }

    this.master = this.form.every((d) => d.select);
    console.log(this.form);
    console.log(this.master);    
  }





  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }
}