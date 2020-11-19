import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isdirect'
})
export class IsdirectPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    debugger
    let values = []
    if(value.testID==411){
      values.push(value[0].testID)
    }
    return values
    

  }

}
