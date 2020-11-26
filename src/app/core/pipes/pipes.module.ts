import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './datepipe.pipe';
import { SplitLastPipe } from './splitString.pip';


@NgModule({
  declarations: [DateFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [],
  providers:    [  ]
})
export class PipesModule { }
