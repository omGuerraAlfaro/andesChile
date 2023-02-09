import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';


import { HomePageRoutingModule } from './home-routing.module';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { InicioComponent } from 'src/app/components/news/inicio.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FinanceComponent, ProfileComponent, InicioComponent]
})
export class HomePageModule {}
