import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VitalsService } from '../vitals.service';

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
  param: any;
  patInfo: any;

  constructor(private vService: VitalsService, private router:Router) { }

  ngOnInit(): void {
    this.patInfo = JSON.parse(localStorage.getItem("newPatData"));  

    this.getpatients()
  }
  getpatients() {
debugger
    this.param = {"doctorID":this.patInfo.doctorID,"status":17, 'hospitalID': this.patInfo.hospitalID };
    this.userLoader = true;
    this.vService.getpatients(this.param).subscribe
      ((response: any) => {
        if (response.status === 0) {
          console.log(response);
          this.userList = response.data;
          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }

  pDetails(obj){
    localStorage.setItem("vitalsData",JSON.stringify(obj))
    this.router.navigate(['/vitals/vitals']);
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
