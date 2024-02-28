import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TbkPageRoutingModule } from './tbk-routing.module';
import { TbkPage } from './tbk.page';

import { FormatNumberPipe } from '../../pipes/format-number.pipe'
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WebpayRespuestaComponent } from 'src/app/components/webpay-respuesta/webpay-respuesta.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TbkPageRoutingModule
  ],
  declarations: [TbkPage, WebpayRespuestaComponent]
})
export class TbkPageModule {}
