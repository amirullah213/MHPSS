import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitStr' })
export class SplitLastPipe implements PipeTransform {
  
  transform(value:string, [separator]):string {
    debugger
    let splits = value.split(separator);
    if(splits.length > 1) {
      return splits.pop();
    } else {
      return '';
    }
  }
}