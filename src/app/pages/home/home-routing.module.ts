import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { ServiciosComponent } from 'src/app/components/servicios/servicios.component';
import { HomePage } from './home.page';
import { ProfilePage } from 'src/app/components/profile/profile.page';

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
        path: 'profile',
        component: ProfilePage
      },
      {
        path: 'service',
        component: ServiciosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
