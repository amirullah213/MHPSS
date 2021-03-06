import { Component, OnDestroy, OnInit, Pipe, PipeTransform, TemplateRef } from '@angular/core';

import { FormBuilder, FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PathServiceService } from '../services/path-service.service';
@Component({
  selector: 'ncri-pending2',
  templateUrl: './pending2.component.html',
  styleUrls: ['./pending2.component.scss'],

})
export class Pending2Component implements OnInit {
  isCollapsed = true;
  userLoader:boolean=false;
  model:any={};
  hospitalID:any;
  doctorID:any;
  userType:any;
  PathResponseArray:any=[];
  errormsg:any;
  patientID:any;
  pathData1:any={};
  userData:any={};
  objPath:any={};
  resultdata:any;
  newArray:any={};
  finalArray:any=[];
  loaderUpdate:boolean=false;
  model2:any={};
  model3:any={};
  singleobj:any={};
  singleArr:any=[];
  modalRef: BsModalRef;
  k: any;
  diagnosisForm:FormGroup;
  purchaseOrder:FormArray;
  notKhali: boolean=false;
  constructor(
    private modalService: BsModalService,
     private fb: FormBuilder,
     private pathService: PathServiceService,
     private router: Router,

  ) {

  }

  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.pathData1=JSON.parse(localStorage.getItem('pathDetails'));
    console.log('pathData1===',this.pathData1)
    // this.userData.status = 0;
   this.getUsersPending();
   this.diagnosisForm = this.fb.group({
   // grnName: ['', Validators.required],
    purchaseOrder: this.fb.array([]),
});
  }
  openModalWithClass(template: TemplateRef<any>,data) {
    if(this.purchaseOrder){this.purchaseOrder.clear()}
    this.userData = data;
   // this.objPath.result=this.userData.result
   localStorage.setItem('pathologyPrint', JSON.stringify(data))
    console.log("this.userData===",this.userData);
    let config = {backdrop: false,ignoreBackdropClick: true     }
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' },config)
    );
    //for single test modal show assigment
    if(!this.userData.subTests){
    this.objPath.result=this.userData.result
  }
    // for dynamic form data form assigment
    if(this.userData.subTests){
    this.userData.subTests.forEach(e => {
      e.tid=this.userData.id;
      debugger
     (this.purchaseOrder = this.diagnosisForm.get('purchaseOrder') as FormArray).push(this.createItem(e));
      console.log('this.purchaseOrder4444444===',this.purchaseOrder);
   
  });
}
  }

  createItem(obj:any): FormGroup {
 
    return this.fb.group({
      result: obj.result,
      testName: obj.testName,
      oldTestName: obj.oldTestName,
      testType:obj.testType,
      refRange:obj.refRange,
      id : obj.id,
      sample : obj.sample,
      xrayFilms6 : obj.xrayFilms6,
      tid:obj.tid

      
    });
  }
  gotoPrintPage(){
    this.modalRef.hide();
    //this.router.navigate(['/print/pathology']);
    window.open('/print/pathology')
    
  }
  //---------------------get all lab patients---------------------
getUsersPending() {
  this.userLoader= true;
  this.model.hospitalID=this.hospitalID;
   this.model.testType=1;
   this.model.userType=this.userType;
   this.model.patientID=this.pathData1.ptID;
   this.model.prescriptionID=this.pathData1.prescriptionID;
 
 
  console.log('model ==', this.model);
  this.pathService.getpendingTests(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        // response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //   this.gettreatmetData.push({"itemName":this.medStr,v});
        //   // console.log('gettreatmetData==',tfhis.gettreatmetData)
        // });
        this.PathResponseArray=response.data;
      console.log('this.PathResponseArray==',this.PathResponseArray);
     // this.openModAdd(cc);
        this.userLoader = false;
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.userLoader = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------------------------------
saveTests(testdata,full){
  debugger;
  
  console.log('testdata=====',testdata);
  this.newArray=full;
  this.newArray.result=testdata;
  if(testdata!=undefined && testdata!='' ){

  var temp = 1;
  for(let e of this.finalArray) { 
  this.k =this.finalArray.indexOf(e);
  if( e.id==this.newArray.id)
 { 
  
    this.finalArray[this.k]["result"] = testdata;
    console.log('this.newArray=====',this.finalArray);
    temp = 0;
    break;
 }

}
  if (temp == 1)
  {
    
    this.finalArray.push(this.newArray)
    console.log('this.newArray=====',this.finalArray);
  }

}else{alert('please fill the field')}
}

 //---------------------update getests---------------------
 updateTests() {
   debugger
  this.loaderUpdate= true;
  this.model2.hospitalID=this.hospitalID;
  for(let pr of this.purchaseOrder.value)
  {
    debugger
    if(pr.result!="")
    {
      this.notKhali =true;
      break;
}
else{
  this.notKhali =false;

}

}
if(this.notKhali==true){
  this.model2.tests=this.purchaseOrder.value;
  this.pathService.updateTests(this.model2).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
        this.loaderUpdate = false;
        this.modalRef.hide();
        this.finalArray=[];
        alert('Updated Succesfully');
        this.getUsersPending();
        this.router.navigate(['/lab-path/home'])

      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUpdate = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );
  }
  else{
    alert("Please enter at least one result")
  }
 }
//--------------------------------
 //---------------------update getests---------------------
 updateSingleTest(res,modData) {
   debugger
   console.log('modData==',modData);

   if(res!=undefined && res!='' && res!=null)
   {
   this.singleobj=modData;
   this.singleobj.result=res;
   this.singleArr.push(this.singleobj);
  this.loaderUpdate= true;
  this.model3.hospitalID=this.hospitalID;
  this.model3.tests=this.singleArr;
   
  console.log('model3 ==', this.model3);
  this.pathService.updateTests(this.model3).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        this.loaderUpdate = false;
        this.modalRef.hide();
        this.singleArr=[];
        this.objPath.result='';
        this.router.navigate(['/lab-path/home'])
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUpdate = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );
  }
  else
  {
    alert("Please enter result")


  }
}
//--------------------------------
}

