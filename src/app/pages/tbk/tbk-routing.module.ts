import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TbkPage } from './tbk.page';

const routes: Routes = [
  {
    path: '',
    component: TbkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TbkPageRoutingModule {}
