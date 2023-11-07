import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutFormatPipe } from 'src/app/pipes/rut-format.pipe';

@NgModule({
  declarations: [RutFormatPipe],
  imports: [CommonModule],
  exports: [RutFormatPipe]
})
export class SharedModule { }