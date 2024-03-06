import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TbkPage } from './tbk.page';
import { WebpayPeticionComponent } from 'src/app/components/webpay-peticion/webpay-peticion.component';

const routes: Routes = [
  {
    path: '',
    component: TbkPage,
    children: [
      {
        path: 'webpay-peticion',
        component: WebpayPeticionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TbkPageRoutingModule {}
