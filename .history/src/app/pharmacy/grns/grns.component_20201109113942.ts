import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ncri-grns',
  templateUrl: './grns.component.html',
  styleUrls: ['./grns.component.scss']
})
export class GrnsComponent implements OnInit {
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
  poID:any;


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
  
  
 this.pharmacySer.getPendPurOrd(this.modal).subscribe(
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
  this.modal2.poID=dt;
  
 this.pharmacySer.getordeItems(this.modal2).subscribe(
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
//get purchase data ended
onSelectMedics(ob)
{
  console.log('medics data selected==',ob.item);
  this.grnobj.unit=ob.item.unit;
  this.grnobj.type=ob.item.type;
  this.grnobj.itemID=ob.item.itemID;
  
}
getID(poid){
  if(this.purchaseOrder){this.purchaseOrder.clear()}
  this.poID=poid;
 console.log('poid===',poid);
 this.getPurchOrderItems(poid);
}
createItem(obj:any): FormGroup {
 
  return this.fb.group({
    itemName: obj.itemName,
    unit: obj.unit,
    type:obj.type,
    quantity:obj.quantity,
    recievedQuantity : '',
    batchNo : '',
    tradeName: '',
    mgfDate: '',
    expireDate : '',
    itemType: obj.itemType,
    unitPrice:obj.unitPrice, 
    itemID :obj.itemID,
    manufacturer:obj.manufacturer,
  });
}
saveData(dat){
  console.log('this.purchaseOrder===',this.purchaseOrder.value);
  console.log('this.dat===',dat);
 
    this.loader_eqp = true;
    this.modal3.recieveDate = this.hospitalID;
    this.modal3.recieveDate = this.todayDate;
    this.modal3.poID  = this.poID;
    this.modal3.parmacyID  = this.doctorID;
    this.modal3.items  = this.purchaseOrder.value;
    this.modal3.hospitalID  = this.hospitalID;
    console.log('this.modal3===',this.modal3);
    
   this.pharmacySer.addPharmacyGRM(this.modal3).subscribe(
      (response: any) => {
        if (response.status === 0) {
         
          this.loader_eqp = false;
          alert('GRN added succesfully');
          window.location.reload();
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

}
