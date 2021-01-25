import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ncri-bincard-smr',
  templateUrl: './bincard-smr.component.html',
  styleUrls: ['./bincard-smr.component.scss']
})
export class BincardSmrComponent implements OnInit {

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

  pharmacyType:any=[];
  todayData:any;
  
  itemid:any=0;
  dateRange:Date;
  constructor(private modalService: BsModalService,
     private pharmaService: PharmacyServicesService,
     private router: Router) { }
  

     ngOnInit(): void {
      this.pharmacyType=JSON.parse(localStorage.getItem('details'));
      this.itemid=JSON.parse(localStorage.getItem('bincard'));
       this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
      console.log('date now==',this.todayData) ;
      this.userData.startDate=this.todayData;
      this.userData.endDate=this.todayData;
      this.userData.pharmacyID=this.pharmacyType.id;
     this.getSmr(this.userData);
     
    }
    //main pharmacy
    getSmr (udata) {
     this.loader= true;
      console.log('udata ==', udata);
      this.pharmaService.smr(udata).subscribe(
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
    
    getSmrDate(dateRange){
      console.log('date range ===',dateRange);
      let date1=formatDate(dateRange[0], 'yyyy-MM-dd', 'en');
      let date2=formatDate(dateRange[1], 'yyyy-MM-dd', 'en');
      console.log('date range1 ===',date1);
      console.log('date range2 ===',date2);
      this.userData.startDate=date1;
      this.userData.endDate=date2;
      this.getSmr(this.userData);
    }
  }
  
