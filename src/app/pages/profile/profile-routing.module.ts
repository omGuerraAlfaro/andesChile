import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ProfileStudentComponent } from 'src/app/components/profile-student/profile-student.component';

const routes: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: '', // perfil general
        component: ProfilePage,
      },
      {
        path: 'student/:id',
        component: ProfileStudentComponent, 
      },
      // otras rutas relacionadas
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
