import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';


@Component({
  selector: 'ncri-medicine-grn',
  templateUrl: './medicine-grn.component.html',
  styleUrls: ['./medicine-grn.component.scss']
})
export class MedicineGrnComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService
    
  ) {

  }
  grnobj:any ={};
  medArray:any=[];
  loader_eqp:boolean=false;
  pharmacyData:any[] =[];
  errormsg:string;
  model5:any ={};
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
        this.pharmacyData = response.data;
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
  this.grnobj.medicUnit=ob.item.unit;
  this.grnobj.medicType=ob.item.type;
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

}
