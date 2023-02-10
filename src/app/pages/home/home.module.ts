import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';


import { HomePageRoutingModule } from './home-routing.module';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import {ServiciosComponent} from 'src/app/components/servicios/servicios.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FinanceComponent, ProfileComponent, ServiciosComponent]
})
export class HomePageModule {}
