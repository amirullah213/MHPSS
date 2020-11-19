import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  userList: any = []
  patInfo:any;
  vitalsData: any;

  constructor(private fb: FormBuilder, private vService: VitalsService, private router:Router
    ) { }

  ngOnInit(): void {
    this.patInfo =localStorage.getItem("details");
    this.getpatients();
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
  getpatients(){
  let param= {"doctorID":this.patInfo.id,"status":17,"hospitalID":this.patInfo.hospitalID}
  this.vService.getpatients(param).subscribe
    ((response:any)=> {
    if(response.status === 0 ){
      this.userList = response.data   
       this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
    (error) => {}
  );
  }
  goToV(pt){
    debugger
  localStorage.setItem("vitalsData",JSON.stringify(pt))
  this.router.navigate(['/vitals/vitals'])
}
  
}
