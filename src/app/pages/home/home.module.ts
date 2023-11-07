import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';


import { HomePageRoutingModule } from './home-routing.module';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import {ServiciosComponent} from 'src/app/components/servicios/servicios.component'
import { RutFormatPipe } from 'src/app/pipes/rut-format.pipe';
import { ProfilePage } from 'src/app/components/profile/profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FinanceComponent, ProfilePage, ServiciosComponent, RutFormatPipe]
})
export class HomePageModule {}
