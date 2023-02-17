import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumeros'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number){
    return "$" + new Intl.NumberFormat().format(value);
  }

}
