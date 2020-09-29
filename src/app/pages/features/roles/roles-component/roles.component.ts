import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  tab: string = 'global'
  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }

  constructor() {

   }

  ngOnInit(): void {
  }

}
