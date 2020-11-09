import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ncri-issue-satt-medic',
  templateUrl: './issue-satt-medic.component.html',
  styleUrls: ['./issue-satt-medic.component.scss']
})
export class IssueSattMedicComponent implements OnInit {
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
  padata:any={};

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
    this.padata=JSON.parse(localStorage.getItem('pharmacyData')) ;
   
    console.log('pharmacyData',this.padata)
   this.todayDate=this.datePipe.transform(date,"yyyy-MM-dd");
   console.log(this.todayDate);

    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.getPatMedicItems();

    this.dynamicForm = this.fb.group({
      grnName: ['', Validators.required],
      purchaseOrder: this.fb.array([]),
  });
    
  }
  GetBirthDate() {
   
    // this.yr = this.yr.replace(/^\s+|\s+$/g, "");
    // this.mn = this.mn.replace(/^\s+|\s+$/g, "");
    // this.dy = this.dy.replace(/^\s+|\s+$/g, "");
  //   console.log(' this.yr', this.yr)
  //  if (this.mn < 10) { this.mn = '0' + this.mn }
  //  alert(new Date(new Date().getFullYear() - this.yr, new Date().getMonth()  - this.mn ));
}
  
get f(){
  return this.dynamicForm.controls;
}
   
//get purchase orde data
getPatMedicItems() {
  this.loader_order = true;
  this.modal.hospitalID=this.hospitalID;
  this.modal.parmacyID=this.doctorID
  this.modal.token=this.padata.token;

 this.pharmacySer.getPatData(this.modal).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.purchaseItems = response.medicines;
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
// this.getPurchOrderItems(this.srID);
}
createItem(obj:any): FormGroup {
 
  return this.fb.group({
    
   
    stockID:obj.id,
    prescribedQuantity: obj.prescribedQuantity,
    issuedQuantity: obj.issuedQuantity,
    medicine: obj.medicine,
    type: obj.type1,
    unit: obj.unit,
    stock:[obj.stock],
    totalQuantity:'',
    stockVal:'',
    dose:obj.dose,
    prandial:obj.prandial,
    itemID:obj.id

    
   
  });
}
saveData(dat){
  console.log('this.purchaseOrder===',this.purchaseOrder.value);
  console.log('this.dat===',dat);
  
  this.loader_eqp = true;
  this.modal3.hospitalID=this.hospitalID;
  this.modal3.parmacyID=this.doctorID;
   this.modal3.ptID=this.padata.ptID;
  this.modal3.medicine=dat.purchaseOrder;


    console.log('this.modal3===',this.modal3);
    
  //  this.pharmacySer.issueMedic(this.modal3).subscribe(
  //     (response: any) => {
  //       if (response.status === 0) {
         
  //         this.loader_eqp = false;
  //         alert('GRN stock added succesfully');
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
  AssinIssueQuantity(ind){

    console.log('resp from batch quantity==',ind);
    console.log('resp from batch stock==',this.purchaseOrder.value[ind].stockVal.totalQuantity);
    console.log('resp from batch stock==',this.purchaseOrder.value[ind].controls);
   // this.dynamicForm.get('totalQuantity').setValue('123');
    this.dynamicForm['controls'].purchaseOrder['controls'][ind]['controls'].totalQuantity.patchValue(this.purchaseOrder.value[ind].stockVal.totalQuantity);
    this.dynamicForm['controls'].purchaseOrder['controls'][ind]['controls'].stockID.patchValue(this.purchaseOrder.value[ind].stockVal.id)
   // this.dynamicForm.controls.purchaseOrder.value [ind].controls['itemName'].patchValue('222')
   // this.purchaseOrder.get('totalQuantity').setValue(this.purchaseOrder.value[ind].stock.totalQuantity);
    // this.purchaseOrder.value[ind].totalQuantity[ind].patchValue(this.purchaseOrder.value[ind].stock.totalQuantity)
  }
  // calculate age
 
}
