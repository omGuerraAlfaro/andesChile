import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { WebpayService } from 'src/app/services/webpay.service';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'finance',
        component: FinanceComponent
      },
      {
        path: 'webpay',
        component: WebpayService
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'inicio',
        component: InicioComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
