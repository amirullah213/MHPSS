import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
@Component({
  selector: 'ncri-bin-card',
  templateUrl: './bin-card.component.html',
  styleUrls: ['./bin-card.component.scss']
})
export class BinCardComponent implements OnInit {

  userData: any = {};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  downloadType: string = 'csv';
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  itemsList: any = []
  modalRef: BsModalRef;

  userType:any=[];
  todayData:any;
  select_opt:any='-1';
  constructor(private modalService: BsModalService,
     private pharmaService: PharmacyServicesService,
     private router: Router) { }

 

  ngOnInit(): void {
    this.userType= localStorage.getItem('hospitalID');
     this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
   console.log('date now==',this.todayData) ;
   this.userData.itemType=this.select_opt;
   this.getItems(this.userData);
  }
  getItems (itmtype) {
   
    this.loader= true;
      //this.userData.itemType=this.select_opt;
    // this.userData.date=this.todayData;
    
    console.log('itmtype ==', itmtype);
    this.pharmaService.getItems(itmtype).subscribe(
      (response: any) => {
        if (response.status === 0) {
         
           this.itemsList=response.data;
           console.log('users list==',this.itemsList);
           this.loader = false;
          
        }
    if (response.status === 1) {
          this.responseText = response.error;
          this.loader = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.responseText);
          
        }
      },
      (error) => {}
    );
  
  }
  selectItemType(abc){
    debugger
    console.log('select option value====',abc);
  }

}
