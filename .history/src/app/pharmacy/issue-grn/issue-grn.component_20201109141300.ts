import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ncri-issue-grn',
  templateUrl: './issue-grn.component.html',
  styleUrls: ['./issue-grn.component.scss']
})
export class IssueGrnComponent implements OnInit {
  hospitalID:any;
  doctorID:any;
  userType:any;
  loader_eqp:boolean=false;
  pharmacyData:any=[];
  modal:any={};
  modal2:any={};
  modal3:any={};
  controls: FormControl[];

  errormsg:any;
  grnobj1:any={};
  grnobj:any={};
  pendPurchData:any=[];
  loader_order:any=false;
  purchaseItems:any=[];
  dynamicForm:FormGroup;
  purchaseOrder:FormArray;
  todayDate:any;
  srID:any;
  stockArr:any=[];
  toPharmacyID:any;

  yr:any=0;
     mn:any=6;
    
    
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService,
    private datePipe: DatePipe,
    
  ) {
   // this.controls = this.purchaseOrder.map(c => new FormControl(false));

  }

  ngOnInit(): void {
    this.GetBirthDate();
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
  GetBirthDate() {
   
    // this.yr = this.yr.replace(/^\s+|\s+$/g, "");
    // this.mn = this.mn.replace(/^\s+|\s+$/g, "");
    // this.dy = this.dy.replace(/^\s+|\s+$/g, "");
    console.log(' this.yr', this.yr)
   if (this.mn < 10) { this.mn = '0' + this.mn }
   alert(new Date(new Date().getFullYear() - this.yr, new Date().getMonth()  - this.mn ));
}
  
get f(){
  return this.dynamicForm.controls;
}
   //get all diagnostic list
getPendingPurOrders() {
  this.loader_eqp = true;
  
 this.pharmacySer.getStockReqs(this.modal).subscribe(
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
  this.modal2.srID=dt;
  this.modal2.hospitalID= this.hospitalID;
  this.modal2.pharmacyID=this.doctorID;

 this.pharmacySer.getStockReqItms(this.modal2).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.purchaseItems = response.data;
      console.log('purchaseItems==',this.purchaseItems)
        this.loader_order = false;
        this.purchaseItems.forEach(e => {
          console.log('eeee',e);
            this.stockArr=e.stock;
          
          (this.purchaseOrder = this.dynamicForm.get('purchaseOrder') as FormArray).push(this.createItem(e));
          console.log('this.purchaseOrder4444444===',this.purchaseOrder);
          console.log('stock22222==',this.stockArr)

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
getID(srid){
  if(this.purchaseOrder){this.purchaseOrder.clear()}
 
 this.srID=srid.srID;
 this.toPharmacyID=srid.pharmacyID;
 console.log('srID===',srid);
 this.getPurchOrderItems(this.srID);
}
createItem(obj:any): FormGroup {
 
  return this.fb.group({
    
   
    stockID: '',
    requiredQuantity: obj.requiredQuantity,
    issuedQuantity: obj.issuedQuantity,
    itemName: obj.itemName,
    type: obj.type,
    unit: obj.unit,
    stock:[obj.stock],
    totalQuantity:''
    
   
  });
}
saveData(dat){
  console.log('this.purchaseOrder===',this.purchaseOrder.value);
  console.log('this.dat===',dat);
  
    this.loader_eqp = true;
    this.modal3.srID  = this.srID;
    this.modal3.hospitalID = this.hospitalID;
    this.modal3.issuanceDate = this.todayDate;
    
    this.modal3.fromPharmacyID  = this.doctorID;
    this.modal3.toPharmacyID  = this.toPharmacyID;
    this.modal3.items  = dat.purchaseOrder;
    console.log('this.modal3===',this.modal3);
    
   this.pharmacySer.addissuedStock(this.modal3).subscribe(
      (response: any) => {
        if (response.status === 0) {
         
          this.loader_eqp = false;
          alert('GRN stock added succesfully');
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
  AssinIssueQuantity(returArr,ind){

    console.log('resp from batch quantity==',ind);
    console.log('resp from batch returArr==',returArr);
   // console.log('resp from batch stock==',this.purchaseOrder.value[ind].stock.totalQuantity);
    
    
   // this.dynamicForm.get('totalQuantity').setValue('123');
    this.dynamicForm['controls'].purchaseOrder['controls'][ind]['controls'].totalQuantity.patchValue(returArr.totalQuantity);
    this.dynamicForm['controls'].purchaseOrder['controls'][ind]['controls'].stockID.patchValue(returArr.id);
    
   // this.dynamicForm.controls.purchaseOrder.value [ind].controls['itemName'].patchValue('222')
   // this.purchaseOrder.get('totalQuantity').setValue(this.purchaseOrder.value[ind].stock.totalQuantity);
    // this.purchaseOrder.value[ind].totalQuantity[ind].patchValue(this.purchaseOrder.value[ind].stock.totalQuantity)
  }
  // calculate age
 
}
