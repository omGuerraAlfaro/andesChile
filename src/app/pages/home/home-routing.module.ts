import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { InicioComponent } from 'src/app/components/news/inicio.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
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
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'news',
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
