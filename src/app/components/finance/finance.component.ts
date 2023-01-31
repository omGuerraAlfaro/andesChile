import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {
  public form = [
    { val: 'Matricula', isChecked: true },
    { val: 'Enero', isChecked: false },
    { val: 'Febrero', isChecked: false },
    { val: 'Marzo', isChecked: false },
    { val: 'Abril', isChecked: false },
    { val: 'Mayo', isChecked: false },
    { val: 'Junio', isChecked: false },
    { val: 'Julio', isChecked: false },
    { val: 'Agosto', isChecked: false },
    { val: 'Septiembre', isChecked: false },
    { val: 'Octubre', isChecked: false },
    { val: 'Noviembre', isChecked: false },
    { val: 'Diciembre', isChecked: false },
  ];

  constructor(private router: Router) { }

  ngOnInit() {}


  goPagar(){
    this.router.navigate(['/tbk'])
  }

  

}
