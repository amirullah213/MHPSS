import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RadServiceService } from '../services/rad-service.service';
import { FormsModule } from '@angular/forms';
 
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'ncri-diagnosis-pending-rad',
  templateUrl: './diagnosis-pending-rad.component.html',
  styleUrls: ['./diagnosis-pending-rad.component.scss']
})
export class DiagnosisPendingRadComponent implements OnInit {

  htmlContent = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  
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
  // for add aray
  addObj:any={};
  AddArray:any=[];
  finalAddArray:any=[];
  findingObj:any={};

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
     private radService: RadServiceService,
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
  onChange() {
  }
  onEditorChange() {
  }
  onReady() {
  }
  onFocus() {
  }

  onBlur() {
  }
  onContentDom() {
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
   this.model.testType=2;
   this.model.userType=this.userType;
   this.model.patientID=this.pathData1.ptID;
 
 
  console.log('model ==', this.model);
  this.radService.getpendingTests(this.model).subscribe(
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
  this.radService.updateTests(this.model2).subscribe(
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
//--------------------------------fupdateSingleTest
 //---------------------update getests---------------------
 updateSingleTest(diagnos) {
   console.log('diagnos==',diagnos);

  
  //  this.singleobj=this.addObj;
   
  //  this.singleobj.xrayFilms6=JSON.stringify(this.finalAddArray) ;
   
  //  this.singleobj.result= diagnos;
  //  console.log('this.singleobj==',this.singleobj);
  
  //  this.singleArr.push(this.singleobj);
  //  console.log('this.singleArr==',this.singleArr);
  //  this.loaderUpdate= true;
  // this.model3.hospitalID=this.hospitalID;
  //  this.model3.tests=this.singleArr;

   // new method add radiology previous method is above
   this.model3.id=this.userData;
   this.model3.xrayFilms6=diagnos.name;
   this.model3.result=diagnos.result;

  console.log('model3 ==', this.model3);
  this.radService.updateTests(this.model3).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        
        this.loaderUpdate = false;
        this.modalRef.hide();
        // this.singleArr=[];
        // this.objPath.result='';
        // this.finalAddArray=[];
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
// addObj:any={};
// AddArray:any=[];
// finalAddArray:any=[];
addtoArr(finding,dat){
  this.finalAddArray.push({'name':finding.name});
   console.log('$this.finalAddArray==',this.finalAddArray);
   //this.AddArray=JSON.stringify(this.finalAddArray);
  // console.log('$AddArray==',this.AddArray);
  // this.finalAddArray.push(this.finalAddArray);
  // console.log('this.AddArray stringify==',this.AddArray);
  
  this.addObj=dat;
  this.objPath.name=''
  // this.addObj.xrayFilms6=this.AddArray;
  // console.log('$this.addObj==',this.addObj);
}
//===============================
//--------------------------------
removeArr(indx){
  this.finalAddArray.splice(indx, 1);
  console.log('$x==',this.finalAddArray)
}
//===============================
}

