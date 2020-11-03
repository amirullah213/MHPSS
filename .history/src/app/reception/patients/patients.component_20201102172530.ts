import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ncri-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  myDate:any = new Date();
  constructor(private datePipe: DatePipe){
      this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      console.log('this.myDate',this.myDate)
  }
 
  

  ngOnInit(): void {
    
  }

}
