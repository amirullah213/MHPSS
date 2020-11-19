import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LabourRoomSerivce } from '../labour-room.service';
import { formatDate } from '@angular/common';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { PharmaSeenPatientsComponent } from 'src/app/pharmacy/pharma-seen-patients/pharma-seen-patients.component';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { setHours } from 'ngx-bootstrap/chronos/utils/date-setters';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';

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
  localIndoorData: any=[];
  Indid: any;
  docType: any;
  arrylist: any[];
  id: any;
  localDiagData: any=[];
  diagID: any;
  IndoorDiagData: any=[];
  selectedValueIndoorDiag: string;
  

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
      selectedValueIndoorDiag:[''],
      descriptionIndoor:['']
      

    });
   
   
   }

  ngOnInit(): void {
    this.patInfo=JSON.parse(localStorage.getItem("patData"))
    this.getindoorlist()
    this.getindoordiagnosis();
    this.getobstetric();


  }
  onSelectIndoorDiag(event: TypeaheadMatch): void {
 
    this.Indid = event.item.id
    
 
  }
  get f() {
    return this.opAdmit.controls;
  }

  getTi(v)
  {
    debugger
  }
  updateobstetric(){
    let opl = this.opAdmit.value;     
     let delTime = opl.deliveryTime.toString().split(" ");
    console.log(delTime[4]);
     let delDate = formatDate(opl.deliveryDate, "y-M-d", "en-PK")
    debugger
    this.userLoader = true;

    this.param= {"isMisoprostol": opl.isMisoprostol?1:0,"patientID":this.patInfo.patientID,"deliveryTime":delTime[4],
    "isStillBirth":opl.isStillBirth?1:0,"isLessWeight":opl.isLessWeight,
    "departmentID":this.patInfo.departmentID,"maleCount":opl.maleCount,"birthAsphyxia":opl.birthAsphyxia?1:0,"tokenID":this.patInfo.ptID,
    "deliveryConductedBy":opl.deliveryConductedBy,"deliveryDate":delDate,"deliveryNature":opl.deliveryNature,
    "isCHX":opl.isCHX?1:0,"hospitalID":this.patInfo.hospitalID,"neonatalDeathType":opl.neonatalDeathType,"femaleCount":opl.femaleCount,
  "otherProcedure":opl.otherProcedure,"isPreterm":opl.isPreterm?1:0,"complicationAfterDelivery":opl.complicationAfterDelivery}
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
getobstetric(){
  this.userLoader = true;
  this.param= {"tokenID":this.patInfo.ptID,"hospitalID":this.patInfo.hospitalID}
  this.labrService.getobstetric(this.param).subscribe
  ((response: any) => {
    if (response.status === 0) {

      if(response.data && response.data!=undefined && response.data.length!=0)
      {
        this.putAdmt(response.data);
      }
      this.userLoader = false;
    } else {
      this.userLoader = false;
      alert('Something went wrong try again');
    }
  },
    (error) => { }
  );

}

putAdmt(dt)
{
  var timeArr = dt.deliveryTime.split(':');
  let h1 = parseInt(timeArr[0]);
  let m1 = parseInt(timeArr[1]);
  let s1 = parseInt(timeArr[2]);
  
var date1 = new Date();
var h = date1.setHours(h1,m1,s1);
var endTime =formatDate(h,"y-M-d h:mm:ss",'en-PK');
  debugger
this.opAdmit.patchValue({

  isMisoprostol: dt.isMisoprostol,
  deliveryTime:endTime,
  isStillBirth:dt.isStillBirth,
  complicationAfterDelivery: dt.complicationAfterDelivery,
  isLessWeight: dt.isLessWeight,
  otherProcedure:dt.otherProcedure,
  femaleCount:dt.femaleCount,
  neonatalDeathType:dt.neonatalDeathType,
  isCHX:dt.isCHX,
  maleCount:dt.maleCount,
  deliveryNature:dt.deliveryNature,
  birthAsphyxia:dt.birthAsphyxia,
  isPreterm:dt.isPreterm,
  deliveryDate:dt.deliveryDate,
  deliveryConductedBy:dt.deliveryConductedBy,
  
})

}


getindoordiagnosis() {
  this.param = { };
  this.IndoorDiagData=[]
  
  this.labrService.getindoordiagnosis(this.param).subscribe
      ((response: any) => {
        
      if (response.status === 0) {
      
        this.IndoorDiagData = response.data;
       

        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
}
addIndoorDiag() {
    
  let inv = this.opAdmit.value;
  var temp = 0;
  if(this.localIndoorData.length!=0){
    for(let e of this.localIndoorData)
      {  
      if(e.id==this.Indid){
      alert("Diagnosis already Exists");
      temp = 1;
      break
     }
  }
  if (temp == 0)
  {
    this.localIndoorData.push({ "id": this.Indid, "name": inv.selectedValueIndoorDiag,"description":inv.descriptionIndoor }) 
  }
}else{
  this.localIndoorData.push({ "id": this.Indid, "name": inv.selectedValueIndoorDiag,"description":inv.descriptionIndoor }) 
}
  this.opAdmit.patchValue({
    'selectedValueIndoorDiag': '',
    'descriptionIndoor':''
  })
}
removeIndoorDiag(index) {

  if (index > -1) {
    this.localIndoorData.splice(index, 1);
  }
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
   debugger

  let serCall =false;
  let inv =this.opAdmit.value;
  
  if(inv.selectedValueIndoorDiag!=undefined && this.Indid!=undefined)
  {
    debugger
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
    
    if(this.docType!=undefined && op==1)
{   
       
      serCall=true;
      this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.patInfo.ptID,"patientID": this.patInfo.patientID,"departmentID":this.id,"diagnosis":this.localIndoorData,"isIndoor":this.docType,"refferedFrom":-1,}

}

if(serCall==true){
this.labrService.generatetoken(this.param).subscribe
  ((response: any) => {
    if (response.status === 0) {
      
      this.router.navigate(["labour-room/home"])
     
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

alert("please Select Refferel For Admition")
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
