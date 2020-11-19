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

  constructor(private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService) { }

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
    userData1:any ={};
    statesComplex:any[]=[];
    customSelected: string;
    pharmacyList:any =[];
    pharmacyStock:any =[];
    stockArr:any=[];
    grnobj3:any ={};
    showArr:any=[];
    showObj:any={};
    ngOnInit(): void {
     // this.userData.hospitalID=localStorage.getItem('hospitalID');
      
      //this.userData.prescriptionID=-1;
      this.userData1.id=localStorage.getItem('docId');
      this.getPharmacies(this.userData1);

      this.userData.parmacyID=localStorage.getItem('docId');
      this.getPharmacyStock(this.userData);
    }

    //get all diagnostic list
   getPharmacies(patObj) {
    this.loader_eqp = true;
    
   this.pharmacySer.getPharmacies(patObj).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.pharmacyList = response.data;
        console.log('pharmacies list==',this.pharmacyList)
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
  
    //get all diagnostic list
   getPharmacyStock(patObj) {
    this.loader_eqp = true;
    
   this.pharmacySer.getPharmaStock(patObj).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.pharmacyStock = response.data;
        console.log('pharma stock==',this.pharmacyStock)
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
     this.stockArr=ob.item.stock;
     console.log('stock==',this.stockArr);
    //  this.grnobj.type=ob.item.type;
    //  this.grnobj.itemID=ob.item.itemID;
    
  }
  addToMedicArr(medArr,nameobj){
  this.medArray.push(medArr);
  // this.showObj=medArr;
  // this.showObj.name=nameobj.itemName;
  // this.showArr.push(this.showObj);
  
  this.grnobj={};
  this.grnobj3={};
  this.stockArr=[];
  console.log('med arrat==',this.medArray);
  console.log('med showArr==',this.showArr)
  }
  
  removeArr(indx){
     
    this.medArray.splice(indx, 1);
    console.log('$x==',this.showArr)
  }
  
  //add new grn
  issueGRNPharmacy(ref) {
    this.loader_eqp1 = true;
    this.model6.items=this.medArray;
    this.model6.fromPharmacyID=localStorage.getItem('docId');
    this.model6.toPharmacyID=ref.toPharmacyID;
    this.model6.referenceNo=ref.refrence;
   
   this.pharmacySer.issueStock(this.model6).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.pharmacyData = response.data;
        console.log('this.pharmacy pats==',this.pharmacyData)
          this.loader_eqp1 = false;
          this.medArray=[];
          this.grnobj1={};
          this.grnobj={};
          this.grnobj3={};
          alert('Stock issued Succesfuly')
        }
    if (response.status === 1) {
          this.errormsg = response.error;
          this.loader_eqp1 = false;
          console.log('error=', this.errormsg);
          alert(this.errormsg)
          //this._loginserviceService.logout();
        }
      },
      (error) => {}
    );
  
  }
  //add new grn
  }
  
