import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router) {
    setTimeout(() => {
      if (localStorage.getItem('ingresado') && (localStorage.getItem('usuario'))) {
        this.router.navigate(['/home/profile']);
      } else {
        localStorage.setItem('ingresado', 'false')
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  ngOnInit() {
  }

  schoolAnimation: AnimationOptions = {
    path: '../../../assets/img/animations/splash.json',
    loop: true,
    autoplay: true,
  };

  spinnerAnimation: AnimationOptions = {
    path: '../../../assets/img/animations/spinner.json',
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: any): void {
    console.log(animationItem);
  }

}
