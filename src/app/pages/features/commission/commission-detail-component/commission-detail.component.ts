import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-commission-detail',
  templateUrl: './commission-detail.component.html',
  styleUrls: ['./commission-detail.component.scss']
})
export class CommissionDetailComponent implements OnInit {

  tab: string = 'allUsers'
  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }

  constructor() { } 

  ngOnInit(): void {
  }

}
