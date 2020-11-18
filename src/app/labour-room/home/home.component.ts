import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {LabourRoomSerivce} from "../labour-room.service"

@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit {


  userData: any = {};
  model5: any = {};
  model6: any = {};
  loader_eqp: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  pharmacyData: any = [];
  modalRef: BsModalRef;

  activateLoader: boolean = false;
  deactivateLoader: boolean = false;

  errormsg: string;
  beds: any = {};
  userDataRow: any = {};
  admit: any = {};
  loader_eqp2: boolean = false;
  param:any
  details: any;
  userList: any;
  userLoader: boolean;
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private labrService : LabourRoomSerivce
  ) {
  }

  ngOnInit(): void {
    this.details= JSON.parse(localStorage.getItem("details"));
    this.getpatients(8)
    if (localStorage.getItem("tab"))
    this.setTab(localStorage.getItem("tab"))
  }

  //set tab
  setTab(tab: string) {
   localStorage.setItem("tab",tab)   
   if (tab == 'newPats') {
   this.getpatients(8)
   this.tab = tab;
      // this.getWardPats(this.userData)
    };
    if (tab == 'penPats') {
      this.getpatients(9)
      this.tab = tab;
      // this.getWardPats(this.userData)
    };
    if (tab == 'seenPats') {
      this.getpatients(10)
      this.tab = tab;
      // this.getWardPats(this.userData)
    };
  }
 
  getpatients(sts){
    this.userLoader = true;

     this.param= {"doctorID":this.details.id,"status":sts,"hospitalID":this.details.hospitalID}
     this.labrService.getpatients(this.param).subscribe

     ((response: any) => {
       if (response.status === 0) {
         
         this.userList=response.data;
         this.userLoader = false;
       } else {
         this.userLoader = false;
         alert('Something went wrong try again');
       }
     },
       (error) => { }
     );
    }
   
    goToDetails(obj,tb)
    {
      localStorage.setItem("patData", JSON.stringify(obj))
     if(tb==1){
      this.router.navigate(['/labour-room/seen']);
     }
     else{
      this.router.navigate(['/labour-room/pending']);
     }
      
      }

}
