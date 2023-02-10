import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {

  master: boolean = false;
  public form = [
    { id: "AC-001", datail: 'Matricula', select: false, mount: 350000, expirationDate: "05/02/2023" },
    { id: "AC-002", datail: 'Marzo', select: false, mount: 350000, expirationDate: "05/03/2023" },
    { id: "AC-003", datail: 'Abril', select: false, mount: 350000, expirationDate: "05/04/2023" },
    { id: "AC-004", datail: 'Mayo', select: false, mount: 350000, expirationDate: "05/05/2023" },
    { id: "AC-005", datail: 'Junio', select: false, mount: 350000, expirationDate: "05/06/2023" },
    { id: "AC-006", datail: 'Julio', select: false, mount: 350000, expirationDate: "05/07/2023" },
    { id: "AC-007", datail: 'Agosto', select: false, mount: 350000, expirationDate: "05/08/2023" },
    { id: "AC-008", datail: 'Septiembre', select: false, mount: 350000, expirationDate: "05/09/2023" },
    { id: "AC-009", datail: 'Octubre', select: false, mount: 350000, expirationDate: "05/10/2023" },
    { id: "AC-010", datail: 'Noviembre', select: false, mount: 350000, expirationDate: "05/11/2023" },
    { id: "AC-011", datail: 'Diciembre', select: false, mount: 350000, expirationDate: "05/12/2023" },
  ];

  constructor(private router: Router) {
    //service bd

  }

  ngOnInit() {
    
  }
  
  
  goPagar() {
    this.router.navigate(['/tbk'])
  }
  

  onChange($event: any) {
    const id = $event.detail.value;
    const isChecked = $event.detail.checked;
    console.log(id, isChecked);


    this.form = this.form.map((d) => {
      if (d.id == id) {
        d.select = isChecked;
        return d;
      }
      if (id == -1) {
        d.select = this.master;
        return d;
      } else {
        this.master = this.form.every((d) => d.select);
        return d;
      }
    });
    console.log(this.form);

  }
}

//this.form.every((d) => d.select);