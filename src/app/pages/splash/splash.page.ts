import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router:Router) { 
    setTimeout(()=>{
      if(localStorage.getItem('ingresado')&&(localStorage.getItem('usuario'))){
        this.router.navigate(['/home/profile']);
      }else{
        localStorage.setItem('ingresado', 'false')
        this.router.navigate(['/login']);
      }      
    },2000);
  }

  ngOnInit() {
  }

}
