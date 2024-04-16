import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit() { }


  async irPagina() {
    await Browser.open({ url: 'https://colegioandeschile.cl/' });
  };

  async irUtiles() {
    await Browser.open({ url: 'https://colegioandeschile.cl/utiles/' });
  };

  async irLirmi() {
    await Browser.open({ url: 'https://login.lirmi.com/login/' });
  };

  async irContacto() {
    await Browser.open({ url: 'https://colegioandeschile.cl/contacto/' });
  };

  async irPAE() {
    await Browser.open({ url: 'https://colegioandeschile.cl/pae/' });
  };

  async irComunidad() {
    await Browser.open({ url: 'https://colegioandeschile.cl/comunidad/' });
  };

  async irInstagram() {
    await Browser.open({ url: 'https://www.instagram.com/cach.colegioandeschile/' });
  };

  async irFacebook() {
    await Browser.open({ url: 'https://www.facebook.com/colegioandeschile' });
  };

  async irTikTok() {
    await Browser.open({ url: 'https://www.tiktok.com/@cach.colegioandes4' });
  };

}
