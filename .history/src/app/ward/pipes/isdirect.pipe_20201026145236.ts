import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isdirect'
})
export class IsdirectPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
    if(value.isDirect==1)
    return value
    

  }

}
