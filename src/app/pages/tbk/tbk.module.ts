import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TbkPageRoutingModule } from './tbk-routing.module';

import { TbkPage } from './tbk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TbkPageRoutingModule
  ],
  declarations: [TbkPage]
})
export class TbkPageModule {}
