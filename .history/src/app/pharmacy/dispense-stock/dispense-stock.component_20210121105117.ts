import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ncri-dispense-stock',
  templateUrl: './dispense-stock.component.html',
  styleUrls: ['./dispense-stock.component.scss']
})
export class DispenseStockComponent implements OnInit {
  // medStr: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService,
    private datePipe: DatePipe
    
  ) {

  }
  grnobj1:any ={};
  grnobj:any ={};
  medArray:any=[];
  loader_eqp:boolean=false;
  loader_eqp1:boolean=false;
  pharmacyData:any[] =[];
  errormsg:string;
  model5:any ={};
  model6:any ={};
  userData:any ={};
  statesComplex:any[]=[];
  customSelected: string;
  todayDate:any;
  HospDetails:any={};
  pharmacyid:any;
  modal1:any={};
  stckArr:any=[];
   medStr:any;


  ngOnInit(): void {
    var date = new Date();
  
    this.todayDate=this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.todayDate);

    this.HospDetails=JSON.parse(localStorage.getItem('details')) ;
    console.log("details===",this.HospDetails)
    this.userData.hospitalID=localStorage.getItem('hospitalID');
    this.pharmacyid=localStorage.getItem('docId');
    console.log("pharmacyid===",this.pharmacyid)
    this.userData.prescriptionID=-1;
    this.getMedics();

  }

  //get all diagnostic list
 getMedics() {
  this.loader_eqp = true;
  this.modal1.pharmacyID=this.pharmacyid;
  this.modal1.itemType=3;
 this.pharmacySer.getPharmacyStock(this.modal1).subscribe(
    (response: any) => {
      if (response.status === 0) {
        response.data.forEach(v => {
          this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
          this.pharmacyData.push({"itemName":this.medStr});
          // console.log('gettreatmetData==',this.gettreatmetData)
        });
      console.log('this.pharmacy pats==',this.pharmacyData);
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
//get all diagnostic list
onSelectMedics(ob)
{
  debugger
  console.log('medics data selected==',ob.item);
  this.grnobj.unit=ob.item.v.unit;
  this.grnobj.type=ob.item.v.type;
  this.grnobj.itemID=ob.item.v.itemID;
  this.stckArr=ob.item.v.stock;
  
  
  
}
addToMedicArr(medArr){
this.medArray.push(medArr);
this.grnobj={};
console.log('med arrat==',this.medArray)
}

removeArr(indx){
   
  this.medArray.splice(indx, 1);
  console.log('$x==',this.medArray)
}
getdata(tsc){
  console.log("stc===",tsc);
  this.grnobj.totalQuantity=tsc.totalQuantity;
  this.grnobj.itemsstock_id=tsc.id;
}
//add new grn
addDispenseOrd() {
  debugger
  this.loader_eqp1 = true;
  this.model6.pharmacyID=localStorage.getItem('docId');
  this.model6.date=this.todayDate;
  this.model6.items=this.medArray;
  
  console.log('model6==',this.model6)
 this.model6.hospitalID=localStorage.getItem('hospitalID');

 this.pharmacySer.addDispense(this.model6).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.pharmacyData = response.data;
      console.log('this.pharmacy pats==',this.pharmacyData)
        this.loader_eqp1 = false;
        this.medArray=[];
        this.grnobj1={};
        this.grnobj={};
        alert('Dispense added Successfuly');
        window.location.reload();
      }
  if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_eqp1 = false;
        console.log('error=', this.errormsg);
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}
//add new grn
}

