import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  
  transform(value: any, ...args: any[]): any {
      ///MMM/dd/yyyy 
      return super.transform(value, "yyyy-MM-dd");
  }

}
