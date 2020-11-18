import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LabourRoomSerivce } from '../labour-room.service';

@Component({
  selector: 'ncri-admitted-patients',
  templateUrl: './admitted-patients.component.html',
  styleUrls: ['./admitted-patients.component.scss']
})
export class AdmittedPatientsComponent implements OnInit {

  mytime: Date = new Date();
  opAdmit: FormGroup;
  userLoader: boolean;
  param:any
  patInfo: any;
  refList: any;
  localIndoorData: any;
  Indid: any;
  docType: any;
  arrylist: any[];
  id: any;
  constructor( private fb: FormBuilder,
    private router: Router,
    private labrService : LabourRoomSerivce) {
    this.opAdmit = this.fb.group({
      isMisoprostol: [''],
      deliveryTime: [''],
      isStillBirth:[''],
      complicationAfterDelivery: [''],
      isLessWeight: [''],
      otherProcedure:[''],
      femaleCount:[''],
      neonatalDeathType:[''],
      isCHX:[''],
      maleCount:[''],
      deliveryNature:[''],
      birthAsphyxia:[''],
      isPreterm:[''],
      deliveryDate:[''],
      deliveryConductedBy:[''],
      ref:[''],
      diagnosis:['']
      

    });
   
   
   }

  ngOnInit(): void {
    this.patInfo=localStorage.getItem("patData")
  }
  get f() {
    return this.opAdmit.controls;
  }
  updateobstetric(){
    let opl = this.opAdmit.value;   
    
    this.userLoader = true;

    this.param= {"isMisoprostol": opl.isPPH?1:0,"patientID":this.patInfo.patientID,"deliveryTime":opl.parity,
    "isStillBirth":opl.isStillBirth?1:0,"isLessWeight":opl.isLessWeight?1:0,"otherDiagnostics":opl.otherDiagnostics,
    "departmentID":this.patInfo.departmentID,"maleCount":opl.maleCount,"birthAsphyxia":opl.birthAsphyxia,"token":this.patInfo.ptID,
    "deliveryConductedBy":opl.deliveryConductedBy,"deliveryDate":opl.deliveryDate,"deliveryNature":opl.deliveryNature,
    "isCHX":opl.isCHX?1:0,"hospitalID":this.patInfo.hospitalID,"neonatalDeathType":opl.neonatalDeathType,"femaleCount":opl.femaleCount,
  "otherProcedure":opl.otherProcedure}
    this.labrService.updateobstetric(this.param).subscribe

    ((response: any) => {
      if (response.status === 0) {
        localStorage.setItem("tab",'penPats')
        this.router.navigate(['/labour-room/home'])
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
}
getindoorlist()
{
  this.param={"hospitalID": localStorage.getItem('hospitalID')}
  this.labrService.getindoorlist(this.param).subscribe
  ((response: any) => {
    if (response.status === 0) {
              
      
    this.refList = response.data;

      this.userLoader = false;
    } else {
      this.userLoader = false;
      alert('Something went wrong try again');
    }
  },
    (error) => { }
  );
 
 }
 generatetoken(op){
  let serCall =false;
  let inv =this.opAdmit.value;
  if(inv.selectedValueIndoorDiag!=undefined && this.Indid!=undefined)
  {
    let temp =0;
    if(this.localIndoorData.length!=0){
  for(let e of this.localIndoorData)
  {  
  if(e.id==this.Indid){
//  alert("Diagnosis already Exists");
  temp = 1;
  break
 }
}
    }
    
if (temp == 0)
{
this.localIndoorData.push({ "id": this.Indid, "name": inv.selectedValueIndoorDiag,"description":inv.descriptionIndoor }) 
}
this.opAdmit.patchValue({
'selectedValueIndoorDiag': '',
'descriptionIndoor':''
})
}
  if(this.localIndoorData.length!=0 && this.localIndoorData!=undefined )
  {

    this.userLoader=true
    
    if(this.docType!=undefined && op==0)
{   
       
      serCall=true;
      this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.patInfo.ptID,"patientID": this.patInfo.patientID,"departmentID":this.id,"diagnosis":this.localIndoorData,"isIndoor":this.docType,"refferedFrom":-1,}

}

if(serCall==true){
this.labrService.generatetoken(this.param).subscribe
  ((response: any) => {
    if (response.status === 0) {
      this.router.navigate(["doctor/user"])
     
      this.userLoader = false;
    } else {
      this.userLoader = false;
      alert('Something went wrong try again');
    }
  },
    (error) => { }
  );
 
}
else{
this.userLoader=false

alert("please Select Refferel For Admition or Select a Date for operate")
}
  }
else{
  this.userLoader=false

  alert("please select diagnoses")
}
}
changeRefVal(e){
     
     
  if(e!="Choose Referral"){
 this.arrylist=[]
 this.arrylist = this.refList
 for(let ele of this.arrylist ){
   
   let fulName = ele.fname + " " + ele.lname;
   if(fulName == e){
   this.docType=ele.docType;
   this.id = ele.id;
   break;
   }
   else{
     this.docType=undefined
     this.id=undefined
   }
 }
}
}
}
