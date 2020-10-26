import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isdirect'
})
export class IsdirectPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    //debugger
    let values = []
    for (let val of value){
      if(val.isDirect==1){
        values.push(val)
      }
    }
    
    return values
    

  }

}
