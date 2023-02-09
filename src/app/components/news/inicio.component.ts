import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {


  constructor() { }

  ngOnInit() { }



  async irPagina() {
    await Browser.open({ url: 'https://colegioandeschile.cl/' });
  };

  async irUtiles() {
    await Browser.open({ url: 'https://colegioandeschile.cl/lista-de-utiles/' });
  };

  async irLirmi() {
    await Browser.open({ url: 'https://login.lirmi.com/login/' });
  };

  async irContacto() {
    await Browser.open({ url: 'https://colegioandeschile.cl/contacto/' });
  };

  async irPAE() {
    await Browser.open({ url: 'https://colegioandeschile.cl/programa-pae/' });
  };

  async irComunidad() {
    await Browser.open({ url: 'https://colegioandeschile.cl/comunidad-andes-chile/' });
  };

}
