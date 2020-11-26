import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';


@Component({
  selector: 'ncri-medicine-grn',
  templateUrl: './medicine-grn.component.html',
  styleUrls: ['./medicine-grn.component.scss']
})
export class MedicineGrnComponent implements OnInit {

  currentDate = new Date();
  form = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([
      new Date(),
      new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))
    ])
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService
    
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
  medStr:any;
  userData:any ={};
  statesComplex:any[]=[];
  customSelected: string;
  ngOnInit(): void {
    this.userData.hospitalID=localStorage.getItem('hospitalID');
     
    this.userData.prescriptionID=-1;
    this.getMedics(this.userData);

  }

  //get all diagnostic list
 getMedics(patObj) {
  this.loader_eqp = true;
  
 this.pharmacySer.getMidicines(patObj).subscribe(
    (response: any) => {
      if (response.status === 0) {
         response.data.forEach(v => {
          this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
          this.pharmacyData.push({"itemName":this.medStr,v});
          // console.log('gettreatmetData==',this.gettreatmetData)
        });
      console.log('this.pharmacy pats==',this.pharmacyData);
      console.log('this.pharmacy pats==',this.pharmacyData)
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
  console.log('medics data selected==',ob.item);
  this.grnobj.unit=ob.item.unit;
  this.grnobj.type=ob.item.type;
  this.grnobj.itemID=ob.item.itemID;
  
}
addToMedicArr(medArr){
console.log('medArr==',medArr)
this.medArray.push(medArr);
this.grnobj={};
console.log('med arrat==',this.medArray)
}

removeArr(indx){
   
  this.medArray.splice(indx, 1);
  console.log('$x==',this.medArray)
}

//add new grn
addNewGRN(ref) {
  this.loader_eqp1 = true;
  this.model6.grns=this.medArray;
  this.model6.hospitalID=localStorage.getItem('hospitalID');
  this.model6.parmacyID=localStorage.getItem('docId');
  this.model6.itemType=1;
  this.model6.referenceNo=ref;
 this.pharmacySer.addNewGRN(this.model6).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.pharmacyData = response.data;
      console.log('this.pharmacy pats==',this.pharmacyData)
        this.loader_eqp1 = false;
        this.medArray=[];
        this.grnobj1={};
        this.grnobj={};
        alert('GRN added Succesfuly')
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
