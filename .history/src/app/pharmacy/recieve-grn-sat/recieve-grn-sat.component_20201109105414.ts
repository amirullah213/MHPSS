import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ncri-recieve-grn-sat',
  templateUrl: './recieve-grn-sat.component.html',
  styleUrls: ['./recieve-grn-sat.component.scss']
})
export class RecieveGrnSatComponent implements OnInit {
  hospitalID:any;
  doctorID:any;
  userType:any;
  loader_eqp:boolean=false;
  pharmacyData:any=[];
  modal:any={};
  modal2:any={};
  modal3:any={};
  controls:FormArray[];
  errormsg:any;
  grnobj1:any={};
  grnobj:any={};
  pendPurchData:any=[];
  loader_order:any=false;
  purchaseItems:any=[];
  dynamicForm:FormGroup;
  purchaseOrder:FormArray;
  todayDate:any;
  istID:any;

  PharmacyName:string;
  details:any={};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService,
    private datePipe: DatePipe
    
  ) {
    
  }

  ngOnInit(): void {
    var date = new Date();
  
   this.todayDate=this.datePipe.transform(date,"yyyy-MM-dd");
   console.log(this.todayDate);

    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.details=JSON.parse(localStorage.getItem('details')) ;
    console.log('details==',this.details.lname)
    this.getPendingPurOrders();

    this.dynamicForm = this.fb.group({
      grnName: ['', Validators.required],
      purchaseOrder: this.fb.array([]),
  });
    
  }
  get f(){
    return this.dynamicForm.controls;
  }
   //get all diagnostic list
getPendingPurOrders() {
  this.loader_eqp = true;
  this.modal.pharmacyID =this.doctorID;
  this.modal.hospitalID =this.hospitalID;
  this.pharmacySer.getIssuedStocks(this.modal).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.pendPurchData = response.data;
      console.log('pendPurchData==',this.pendPurchData)
        this.loader_eqp = false;
      }
  if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        alert('Problem in Service! Please Try again');
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}
//get purchase orde data
getPurchOrderItems(dt) {
  this.loader_order = true;
  this.modal2.istID=dt;
  this.modal2.hospitalID=this.hospitalID;
  
 this.pharmacySer.getIssuedStocksItems(this.modal2).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.purchaseItems = response.data;
      console.log('purchaseItems==',this.purchaseItems)
        this.loader_order = false;
        this.purchaseItems.forEach(e => {
          console.log('eeee',e);
         (this.purchaseOrder = this.dynamicForm.get('purchaseOrder') as FormArray).push(this.createItem(e));
          console.log('this.purchaseOrder4444444===',this.purchaseOrder)
       // purchaseOrder: this.fb.array([ this.createItem(e) ]);
      });
      }
  if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_order = false;
        console.log('error=', this.errormsg);
        alert('Problem in Service! Please Try again');
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}

getID(poid){
  this.istID=poid;
 console.log('poid===',poid);
 this.getPurchOrderItems(poid);
}
createItem(obj:any): FormGroup {
 
  return this.fb.group({
    itemName: obj.itemName,
    unit: obj.unit,
    type:obj.type,
    issuedQuantity:obj.issuedQuantity,
    recievedQuantity : '',
    
  });
}
saveData(dat){
  console.log('this.purchaseOrder===',this.purchaseOrder.value);
  console.log('this.dat===',dat);
     this.modal3.istID   = this.istID;
     this.modal3.recieveDate = this.todayDate;
     this.modal3.parmacyID  = this.doctorID;
     this.modal3.pharmacyName = this.hospitalID;
     this.modal3.items  = dat.purchaseOrder;
    this.loader_eqp = true;
    
    console.log('this.modal3===',this.modal3);
    
  //  this.pharmacySer.addPharmacyGRM(this.modal3).subscribe(
  //     (response: any) => {
  //       if (response.status === 0) {
         
  //         this.loader_eqp = false;
  //         alert('GRN added succesfully');
  //         window.location.reload();
  //       }
  //   if (response.status === 1) {
  //         this.errormsg = response.errors;
  //         this.loader_eqp = false;
  //         console.log('error=', this.errormsg);
  //         alert('Problem in Service! Please Try again');
  //         //this._loginserviceService.logout();
  //       }
  //     },
  //     (error) => {}
  //   );
  
  }

}
