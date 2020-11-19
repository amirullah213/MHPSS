import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PathServiceService } from '../services/path-service.service';

@Component({
  selector: 'ncri-diagnostics-pathology',
  templateUrl: './diagnostics-pathology.component.html',
  styleUrls: ['./diagnostics-pathology.component.scss']
})
export class DiagnosticsPathologyComponent implements OnInit {
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

  
  modalRef: BsModalRef;
  k: any;

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
  }
  openModalWithClass(template: TemplateRef<any>,data) {
    this.userData = data;
    console.log("this.userData===",this.userData);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  //---------------------get all lab patients---------------------
getUsersPending() {
  this.userLoader= true;
  this.model.hospitalID=this.hospitalID;
   this.model.testType=1;
   this.model.userType=this.userType;
   this.model.patientID=this.pathData1.ptID;
 
 
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
  this.loaderUpdate= true;
  this.model2.hospitalID=this.hospitalID;
  this.model2.tests=this.finalArray;
   
  console.log('model2 ==', this.model2);
  this.pathService.updateTests(this.model2).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        // response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //   this.gettreatmetData.push({"itemName":this.medStr,v});
        //   // console.log('gettreatmetData==',tfhis.gettreatmetData)
        // });
       // this.PathResponseArray=response.data;
      //console.log('this.PathResponseArray==',this.PathResponseArray);
     // this.openModAdd(cc);
        this.loaderUpdate = false;
        this.modalRef.hide();
        this.finalArray=[];
        alert('Updated Succesfully')
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
//--------------------------------
 //---------------------update getests---------------------
 updateSingleTest(res,modData) {
   console.log('modData==',modData);

   console.log('res==',res);
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
        // response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //   this.gettreatmetData.push({"itemName":this.medStr,v});
        //   // console.log('gettreatmetData==',tfhis.gettreatmetData)
        // });
       // this.PathResponseArray=response.data;
      //console.log('this.PathResponseArray==',this.PathResponseArray);
     // this.openModAdd(cc);
        this.loaderUpdate = false;
        this.modalRef.hide();
        this.singleArr=[];
        this.objPath.result='';
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
//--------------------------------
}
