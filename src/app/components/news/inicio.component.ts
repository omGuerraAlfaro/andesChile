import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {


  constructor() { }

  ngOnInit() {}



async irPagina() {
  await Browser.open({ url: 'http://capacitorjs.com/' });
};

}
