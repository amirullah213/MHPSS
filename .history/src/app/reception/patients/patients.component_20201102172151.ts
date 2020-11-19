import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
 
 
  constructor() { }

  ngOnInit(): void {
   let  currentDate = new Date();
   console.log('currentDate',currentDate)

//const cValue = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
  }

}
