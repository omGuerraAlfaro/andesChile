import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutFormat'
})
export class RutFormatPipe implements PipeTransform {
  transform(value: any): string | null {
    if (!value) return null;

    const stringValue = value.toString();
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
