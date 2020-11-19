import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './datepipe.pipe';


@NgModule({
  declarations: [DateFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [],
})
export class PipesModule { }
