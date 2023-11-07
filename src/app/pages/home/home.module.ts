import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { ServiciosComponent } from 'src/app/components/servicios/servicios.component'
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FinanceComponent, ProfilePage, ServiciosComponent]
})
export class HomePageModule { }
