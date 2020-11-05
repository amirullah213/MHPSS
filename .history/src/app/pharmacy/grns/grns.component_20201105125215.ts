import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';

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
  errormsg:any;
  grnobj1:any={};
  grnobj:any={};
  pendPurchData:any=[];
  loader_order:any=false;
  purchaseItems:any=[];
  dynamicForm:FormGroup;
  purchaseOrder:FormArray;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService
    
  ) {}

  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.getPendingPurOrders();

    this.dynamicForm = this.fb.group({
      grnName: ['', Validators.required],
     
      purchaseOrder: this.fb.array([]),
  });
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
          debugger;
          (this.purchaseOrder = this.dynamicForm.get('purchaseOrder') as FormArray).push(this.createItem(e));
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
 console.log('poid===',poid);
 this.getPurchOrderItems(poid);
}
createItem(obj:any): FormGroup {
  return this.fb.group({
    medName: obj.medName,
    unit: obj.unit,
    type:obj.type,
    issued:obj.issued,
    recieved: obj.recieved,
    batchNo: obj.batchNo,
    tradeName: obj.tradeName,
    manuDate: obj.manuDate,
    expDate: obj.expDate,
  });
}
saveData(){
  console.log('this.purchaseOrder===',this.purchaseOrder.value)
}
}
