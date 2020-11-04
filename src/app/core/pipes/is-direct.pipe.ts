import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDirect'
})
export class IsDirectPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
 
 let values = []
 for (let val of value){
   if(val.isDirect==1){
     values.push(val)
   }
 }
 
 return values 

}  
}


