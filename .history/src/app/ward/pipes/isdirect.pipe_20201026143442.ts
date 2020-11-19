import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isdirect'
})
export class IsdirectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
