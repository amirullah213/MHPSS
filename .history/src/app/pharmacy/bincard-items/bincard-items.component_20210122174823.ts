import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PharmacyServicesService } from '../services/pharmacy-services.service';

@Component({
  selector: 'ncri-bincard-items',
  templateUrl: './bincard-items.component.html',
  styleUrls: ['./bincard-items.component.scss']
})
export class BincardItemsComponent implements OnInit {
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
  pharmacyShow:string;
  
  itemid:any=0;
  constructor(private modalService: BsModalService,
     private pharmaService: PharmacyServicesService,
     private router: Router) { }
  

     ngOnInit(): void {
      this.pharmacyType=JSON.parse(localStorage.getItem('details'));
      this.itemid=JSON.parse(localStorage.getItem('bincard'));
       this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
      console.log('date now==',this.todayData) ;
      debugger
     if(this.pharmacyType.userType==8){
      this.userData.itemID=this.itemid.itemID;
      this.userData.pharmacyID=this.pharmacyType.id;
      this.pharmacyShow='sattelite';
      this.BincardMainPharmacy(this.userData);
     }else{
      this.userData.itemID=this.itemid.itemID;
      this.userData.pharmacyID=this.pharmacyType.id;
      this.BincardSatellitePharmacy (this.userData);
     }
     
    }
    //main pharmacy
    BincardMainPharmacy (itmtype) {
     this.loader= true;
      console.log('itmtype ==', itmtype);
      this.pharmaService.bincardmainpharmacy(itmtype).subscribe(
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
    //sattelite pharmacy
    BincardSatellitePharmacy (itmtype) {
      this.loader= true;
       console.log('itmtype ==', itmtype);
       this.pharmaService.bincardsatellitepharmacy(itmtype).subscribe(
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
    
     gotoSmrPats(data){
      localStorage.setItem('smrPats',JSON.stringify(data) );
    
    this.router.navigate(['pharma/smr-pat-details'])
    }
    
  }
  
