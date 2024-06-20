import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProfileStudentComponent } from 'src/app/components/profile-student/profile-student.component';
import { ChartComponent } from 'src/app/components/profile-student/chart/chart.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,    
    
  ],
  declarations: [ProfileStudentComponent, ChartComponent]
})
export class ProfilePageModule {}
