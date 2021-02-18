import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preco'
})
export class PrecoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? value.toString().replace('.', ',') : '';
  }

}
