import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TbkPageRoutingModule } from './tbk-routing.module';
import { TbkPage } from './tbk.page';

import { FormatNumberPipe } from '../../pipes/format-number.pipe'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TbkPageRoutingModule
  ],
  declarations: [TbkPage, FormatNumberPipe]
})
export class TbkPageModule {}
