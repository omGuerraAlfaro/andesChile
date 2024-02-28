import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TbkPage } from './tbk.page';
import { WebpayRespuestaComponent } from 'src/app/components/webpay-respuesta/webpay-respuesta.component';

const routes: Routes = [
  {
    path: '',
    component: TbkPage,
    children: [
      {
        path: 'webpay-respuesta',
        component: WebpayRespuestaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TbkPageRoutingModule {}
