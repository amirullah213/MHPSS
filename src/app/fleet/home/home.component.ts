import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FleetService} from "../fleet.service"
@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: any = {};
  paramData: any = {};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  downloadType: string = 'csv';
  modalRef: BsModalRef;
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  userList: any = [];
  patientsList: any;
  ambulanceList: any;
  interval: number;

  constructor(
    private modalService: BsModalService,
    private router: Router,private fService:FleetService
  ) {
  }
  ngOnInit(): void {
    this.getfleetpatients();
    this.getambulances()
    
    if(localStorage.getItem('tab'))
    this.setTab(localStorage.getItem('tab'))
    if(this.router.url === '/fleet/home' && localStorage.getItem('tab')==="newPats"){
      this.interval = setInterval(() => {
        this.getfleetpatients();
      }, 30000);
  }
 
  }
  ngOnDestroy() {
    
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  pDetails(obj){
    localStorage.setItem("newPatData",JSON.stringify(obj))
    this.router.navigate(['/fleet/new-patient']);
  }
  updateambulances(sts:boolean,id:number){

    this.userLoader=true;
    this.paramData={"status":sts,"id":id}
    this.fService.updateambulances(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
        
       this.reloadComponent()
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
  reloadComponent() {
    debugger
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    localStorage.setItem("tab",'seenPats')
    this.router.navigate(['/fleet/home']);
}
 //set tab
  setTab(tab: string) {
    
    if (tab == 'newPats') {
      console.log('tab==', tab);
      this.tab = tab;
      localStorage.setItem("tab",tab)

      this.userData.status = 0;
      this.getUsers(this.userData)
    };
    if (tab == 'penPats') {
      console.log('tab==', tab);
      this.tab = tab;
      localStorage.setItem("tab",tab)

      this.userData.status = 1;
      this.getUsers(this.userData)
    };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      localStorage.setItem("tab",tab)

      this.userData.status = 2;
      this.getUsers(this.userData)
    };
  }


  getfleetpatients(){
this.userLoader=true;
    this.paramData={"status":0}
    this.fService.getfleetpatients(this.paramData).subscribe((response: any) => {
      if (response.status === 0) {
        this.patientsList = response.data
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }


  
  getambulances(){
    this.userLoader=true;
    this.paramData={}
    this.fService.getambulances(this.paramData).subscribe((response: any) => {
      if (response.status === 0) {
        
        this.ambulanceList = response.data
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
  getUsers(obj: any) {

    this.userLoader = true;
  }
}
