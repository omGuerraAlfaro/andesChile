import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutFormatPipe } from 'src/app/pipes/rut-format.pipe';
import { FormatNumberPipe } from 'src/app/pipes/format-number.pipe';

@NgModule({
  declarations: [RutFormatPipe, FormatNumberPipe],
  imports: [CommonModule],
  exports: [RutFormatPipe, FormatNumberPipe]
})
export class SharedModule { }