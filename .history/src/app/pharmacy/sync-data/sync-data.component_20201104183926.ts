import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PharmacyServicesService } from '../services/pharmacy-services.service'

@Component({
  selector: 'ncri-sync-data',
  templateUrl: './sync-data.component.html',
  styleUrls: ['./sync-data.component.scss']
})
export class SyncDataComponent implements OnInit {
  loader_eqp:boolean=false;
  model5:any={};
  syncData:any=[];
  errormsg:any;
  model6:any={};
  purchasecData:any=[];
  model7:any={};


  constructor(
    private modalService: BsModalService,
     private fb: FormBuilder,
      private pharmacySer:PharmacyServicesService,
       private router:Router) {

  }

  ngOnInit(): void {
    this.getDataForSync();
  
  }
//get data for sync
getDataForSync() {
  this.loader_eqp = true;
  
  //this.model5.search=this.selected;
 this.pharmacySer.getSyncDataMerf(this.model5).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.syncData = response.data;
        console.log('this.syncData==',this.syncData);
        if( this.syncData.length>0){
          this.inserPurOrders();
        }
        this.loader_eqp = false;
      
      }

      if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}

//insert purchase orders
inserPurOrders() {
  this.loader_eqp = true;
  
  this.model6.data= this.syncData;
 this.pharmacySer.inserpurchaseOrders(this.model6).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.purchasecData = response.data;
        console.log('this.purchasecData==',this.purchasecData);
        this.loader_eqp = false;
          this.updateMerfSyncStatus();
      }

      if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        alert('Error in service! Please try again')
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}
//----------ended
updateMerfSyncStatus() {
  this.loader_eqp = true;
  
  //this.model7.search=this.selected;
 this.pharmacySer.updateMerfStatus(this.model7).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.syncData = response.data;
        console.log('this.syncData==',this.syncData);
        if( this.syncData.length>0){
          this.inserPurOrders();
        }
        this.loader_eqp = false;
      
      }

      if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}
}
