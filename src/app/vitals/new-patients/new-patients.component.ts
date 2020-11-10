import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-new-patients',
  templateUrl: './new-patients.component.html',
  styleUrls: ['./new-patients.component.scss']
})
export class NewPatientsComponent implements OnInit {

  userData: any = {};
  paramData: any = {};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  downloadType: string = 'csv';
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  userList: any = [];

  constructor() { }

  ngOnInit(): void {
  }
    //set tab
  setTab(tab: string) {
    if (tab == 'newPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 0;
      this.getUsers(this.userData)
    };
    if (tab == 'penPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 1;
      this.getUsers(this.userData)
    };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 2;
      this.getUsers(this.userData)
    };
  }
  getUsers(obj: any) {

    this.userLoader = true;
  }

}
