import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {

  public form = [
    { id: "AC-001", datail: 'Matricula', isChecked: true, mount: 350000, expirationDate: "05/02/2023" },
    { id: "AC-002", datail: 'Marzo', isChecked: false, mount: 350000, expirationDate: "05/03/2023" },
    { id: "AC-003", datail: 'Abril', isChecked: false, mount: 350000, expirationDate: "05/04/2023" },
    { id: "AC-004", datail: 'Mayo', isChecked: false, mount: 350000, expirationDate: "05/05/2023" },
    { id: "AC-005", datail: 'Junio', isChecked: false, mount: 350000, expirationDate: "05/06/2023" },
    { id: "AC-006", datail: 'Julio', isChecked: false, mount: 350000, expirationDate: "05/07/2023" },
    { id: "AC-007", datail: 'Agosto', isChecked: false, mount: 350000, expirationDate: "05/08/2023" },
    { id: "AC-008", datail: 'Septiembre', isChecked: false, mount: 350000, expirationDate: "05/09/2023" },
    { id: "AC-009", datail: 'Octubre', isChecked: false, mount: 350000, expirationDate: "05/10/2023" },
    { id: "AC-010", datail: 'Noviembre', isChecked: false, mount: 350000, expirationDate: "05/11/2023" },
    { id: "AC-011", datail: 'Diciembre', isChecked: false, mount: 350000, expirationDate: "05/12/2023" },
  ];

  constructor(private router: Router) { }

  ngOnInit() {}


  goPagar(){
    this.router.navigate(['/tbk'])
  }

    

}
