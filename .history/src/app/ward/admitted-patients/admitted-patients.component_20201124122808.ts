import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { WardServiceService } from '../service/ward-service.service';
import { APP_CONFIG } from '../../core';
@Component({
  selector: 'ncri-admitted-patients',
  templateUrl: './admitted-patients.component.html',
  styleUrls: ['./admitted-patients.component.scss']
})
export class AdmittedPatientsComponent implements OnInit {

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

  userData: any = {};
  paramData: any = {};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  downloadType: string = 'csv';
  modalRef: BsModalRef;
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  userList: any = [];
  outdoorData:any =[];
  errormsg:string;
  hospitalID:any;
  doctorID:any;
  model5:any ={};
  detailsData:any={};
  model6:any={};
  gettreatmetData:any =[];
  gettreatmetData2:any =[];
  model7:any={};
  getDischargedata1:any=[];
  diagnosArr:any=[];
  medStr:string;
  newDiagnosis:string;
  newDiagArr:any=[];
  diagnosisArr:any=[];
  diagObj:any ={};
  diagnosArr2:any=[];
  model8:any={};
  loaderUpdate:boolean=false;
  model9:any={};
  indoor:any;
  loaderOperate:boolean=false;
  medicShow:boolean=false;
  loaderMedic:boolean=false;
  model99:any={};
  medicinesNewdata:any={};
  medicID:any;
  medicinesFinal:any=[]
  pathologyList:any=[];
  objPath:any ={};
  pathArrNew:any=[];
  selectedOptionRad:any ={};
  radNameData:any =[];
  testTpesdata:any=[];
  radTypeObj:any={};
  model11:any={};
  pathArrNew_added:boolean=false;
  loaderLab:boolean=false;
  xrayArr:any =[];
  xraySingle:any=[];
  model12:any={};
  loaderOutdoor:boolean=false;
  modelimg:any={};
  imagesArr:any=[];
  imageUrl:any;
  imageInModal:any;
  model122:any={};
  //form related variables here
  outdoorForm: FormGroup;
    submitted = false;
    medicArr:any =[];


    treatmentForm:FormGroup;
    dischargeForm:FormGroup;

  constructor(
    private modalService: BsModalService, 
    private fb: FormBuilder,
    private router: Router,
    private wardService:WardServiceService
  ) {

  }
  ngOnInit() {
    this.imageUrl=APP_CONFIG.apiBaseUrl+'getImage/';
    console.log('imageUrl===',this.imageUrl)
   this.indoor= localStorage.getItem('indoorID');
   this.detailsData=JSON.parse(localStorage.getItem('wardData')) ;

    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.getoutDoorData();
    this.getTreatmentData();
    this.getDischargeData();

    this.outdoorForm = this.fb.group({
        criti_ill: ['0', Validators.required],
        operate_procedure: ['', Validators.required],
        dylasis: ['', Validators.required],
        diagnosis: ['', Validators.required],
        description: ['', Validators.required],
        
        // acceptTerms: [false, Validators.requiredTrue]
    },
    //  {
    //     validator: MustMatch('password', 'confirmPassword')
    // }
    );

    this.dischargeForm = this.fb.group(
      {
      dis_type: ['', Validators.required],
      dis_date: ['', Validators.required],
      
  },
 
  );

  this.treatmentForm = this.fb.group(
    {
    med_name: ['', Validators.required],
    med_unit: ['', Validators.required],
    med_type: ['', Validators.required],
    // med_instock: ['', Validators.required]
    med_quantity: ['', Validators.required],
    med_dose: ['', Validators.required],
    med_parandials: ['', Validators.required],
    
    med_remark: ['', Validators.required]
    // acceptTerms: [false, Validators.requiredTrue]
},

);

}

// convenience getter for easy access to form fields
get f() { return this.outdoorForm.controls; }

onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.outdoorForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.outdoorForm.value, null, 4));
}

  

  openDeleteUser(deleteUser: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(deleteUser, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }
 
 
  openModalWithClass(template: TemplateRef<any>,data) {
    this.xrayArr=[];
    this.xraySingle=[];
    this.userData = data;
    console.log('user data===',this.userData);
     
   
 
    //console.log('xray arra==',this.xrayArr)
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.getImages(this.userData.id);
  }
  showImageModal(template1: TemplateRef<any>,img) {
    this.imageInModal=img;
    console.log('this.imageInModal',this.imageInModal);
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, {id: 2, class: 'gray modal-lg' })
    );
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }
  //================get test images
getImages(presIDdata) {
  console.log('presIDdata===',presIDdata);
  this.userLoader= true;
  this.modelimg.prescriptiontest_id=presIDdata;
 
  console.log('modelimg ==', this.modelimg);
  this.wardService.gettestimages(this.modelimg).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response images====',response);
        this.imagesArr=response.data;
        console.log(' response this.imagesArr====',this.imagesArr);
        //this.getlink();
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


//=================mage sended
 //get all diagnostic list
 getoutDoorData() {
  //  the values were repeating make this arrayu empty
  this.pathologyList=[];
  this.radNameData=[];
  this.loaderOutdoor= true;
  this.model5.hospitalID=this.hospitalID;
  this.model5.tokenID=this.detailsData.ptID;
  console.log('modal 5==', this.model5);
  this.wardService.getindoordetails(this.model5).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log('outdoorData33333====',response)
        this.outdoorData = response.data;

//for typehead
        this.diagnosisArr= response.diagnosis;
        console.log('diagnosisArr====',this.diagnosisArr)

//for provisinal showing data
        this.diagnosArr2=JSON.parse(this.outdoorData.diagnosis) ;
        this.diagnosArr= this.diagnosArr2;
        //////// assign value to operative procedure
        this.outdoorForm.patchValue({
          operate_procedure: this.outdoorData.operativeProcedure,
        
        });
       // this.outdoorData.
//fortest type
// this.testTpesdata = response.radiologyTypes;

for (let element of response.radiologyTypes){
 // debugger
  if(this.radTypeObj.id!=undefined)
  {
  this.radTypeObj.id==element.id
  this.radTypeObj
  break
  }
  else
  {
    this.testTpesdata = response.radiologyTypes;
   // this.radTypeObj=response.radiologyType
  }
};
//for test types data

       //for pathology list in text box autocomplete

       if(!this.pathArrNew_added){
        this.pathArrNew=[];
        response.testData.forEach(mm => {
          if(mm.isDirect==1){
            this.pathArrNew.push(mm)
            //this.pathArrNew.push({"id":-1,"result":"","patientID":this.detailsData.patientID,"testName":mm.testName,"testID":mm.testID,"testType":mm.testType,"refRange":mm.refRange,"isSupper":mm.isSupper,"isDirect":mm.isDirect,"subTests":mm.subTests?mm.subTests:[],"xrayFilms6":mm.xrayFilms6})
        }
        });
        
         
       }
      //  else{
      //   response.testData.forEach(k => {
      //     if(k.isDirect==1){
      //       this.pathArrNew.push(k)
      //    // this.pathArrNew.push({"id":-1,"result":"","patientID":this.detailsData.patientID,"testName":k.testName,"testID":k.testID,"testType":k.testType,"refRange":k.refRange,"isSupper":k.isSupper,"isDirect":k.isDirect,"subTests":k.subTests?k.subTests:[],"xrayFilms6":k.xrayFilms6})
      //     }
      //   });
      //   }
       
      // this.pathologyList = response.test;
       response.test.forEach(v => {
        if (v.testType == 1) {
          this.pathologyList.push(v);
         // console.log('path====================',this.pathologyList)
        }
        
        if (v.testType == 2) {
          
          if (this.radTypeObj)
            if (v.radiologyType == this.radTypeObj.id) {
              this.radNameData.push(v);
             // console.log('radNameData===========',this.radNameData)
            }
        }
      });
        //for pathology list in text box autocomplete
      console.log('this.outdoorData==',this.diagnosArr)
        this.loaderOutdoor = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderOutdoor = false;
        console.log('error=', this.errormsg);
        alert('Please Try agian! problem in service')
      }
    },
    (error) => {}
  );

}

 //get all diagnostic list
 getTreatmentData() {
  this.loader= true;
  this.model6.hospitalID=this.hospitalID;
  this.model6.prescriptionID=-1
  console.log('modal 5==', this.model5);
  this.wardService.gettreatmetdata(this.model6).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log('treatment responxswe====',response);
        response.medicines.forEach(v => {
          this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
          this.gettreatmetData.push({"itemName":this.medStr,v});
          // console.log('gettreatmetData==',this.gettreatmetData)
        });
        
      console.log('this.gettreatmetData==',this.gettreatmetData);
        this.loader = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loader = false;
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}

//get all diagnostic list
getDischargeData() {
  this.loader= true;
  this.model7.hospitalID=this.hospitalID;
  this.model7.tokenID=this.detailsData.ptID;
  console.log('modal 7==', this.model7);
  this.wardService.getDischargeData(this.model7).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.getDischargedata1 = response.data;
      console.log('this.getDischargedata1==',this.getDischargedata1)
        this.loader = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loader = false;
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}

//update indoor details

updateIndoor(indoorData) {
  console.log('indoorData',indoorData)
  this.loaderUpdate= true;
  this.model8.hospitalID=this.hospitalID;
  this.model8.tokenID=this.detailsData.ptID;
  this.model8.indoorStatus=1;
  this.model8.isCriticalIll=indoorData.criti_ill;

  this.model8.operativeProcedure=indoorData.operate_procedure;
  this.model8.dialysis=indoorData.dylasis;
  this.model8.dischargeType='';
  this.model8.dischargeDate='';
  this.model8.diagnosis=this.diagnosArr;
  console.log('modal 8==', this.model8);
  
  this.wardService.updateIndoorDetail(this.model8).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.outdoorForm.reset();
        this.getoutDoorData();

        alert('Done Successfully');
        this.loaderUpdate = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUpdate = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
        
      }
    },
    (error) => {}
  );

}
//update indoor details

//operate indoor details
operateIndoor() {
  
  this.loaderOperate= true;
  this.model9.patientID=this.detailsData.patientID;
  this.model9.hospitalID=this.hospitalID;
  this.model9.ptID=this.detailsData.ptID;
  this.model9.departmentID= this.indoor;
  this.model9.isIndoor=4;
  this.model9.refferedFrom=this.outdoorData.bedNo;
  this.model9.diagnosis=this.diagnosArr;
 
  console.log('modal 9==', this.model9);
  
  this.wardService.operateToken(this.model9).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
        this.getoutDoorData();

        alert('Done Successfully');
        this.loaderOperate = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderOperate = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
        
      }
    },
    (error) => {}
  );

}
//operate indoor details

//operate indoor details
addPresMedicines() {
  
  this.loaderMedic= true;
  this.model99.prescriptionID=this.outdoorData.prescriptionID;
  this.model99.medicines=this.medicinesFinal;
  this.model99.type=2;
  this.model99.hospitalID=this.hospitalID;
  

 console.log('modal 9==', this.model99);
  this.wardService.addPresMedics(this.model99).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
       this.medicinesFinal=[];
       // note: arsalan told me to remove updattoken because he is doing it from back end
      // this.updateToken();
        this.getDischargeData();
        alert('Done Successfully');
        this.loaderMedic = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderMedic = false;

        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
      }
    },
    (error) => {}
  );
}

//operate indoor details
sendTolab() {
  
  this.loaderLab= true;
  this.model11.hospitalID=this.hospitalID;
  this.model11.prescriptionID=-1;
  this.model11.patientID=this.detailsData.patientID;
  this.model11.isHB=0;
  this.model11.indoorType=this.outdoorData.bedNo;
  this.model11.departmentID=this.doctorID;
  
  this.model11.investigations=this.pathArrNew;
  this.model11.ptID=this.detailsData.ptID;
  
 console.log('model11 ==', this.model11);
  this.wardService.sendtolab(this.model11).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
      // this.medicinesFinal=[];
      this.pathArrNew=[];
      this.pathArrNew_added=false;
        this.getoutDoorData();
        alert('Done Successfully');
        this.loaderLab = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderLab = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
      }
    },
    (error) => {}
  );
}
onSelectMedics(medic){
  console.log("medic data===",medic.item);
this.medicID=medic.item.v.itemID;
  this.treatmentForm.patchValue({
    med_unit: medic.item.v.unit,
    med_type: medic.item.v.type, 
    
  });

}
addmoreMedics(){
  this.medicShow=true;
  console.log('treatmentForm values==',this.treatmentForm.value);
  //this.medicArr.push(this.treatmentForm.value);
  console.log('medicArr==',this.medicArr);
  this.medicinesNewdata['medicine']=this.treatmentForm.value.med_name;
 // this.medicinesNewdata['med_unit']=this.medicArr.med_unit;
 // this.medicinesNewdata['med_unit']=this.medicArr.med_type;
  this.medicinesNewdata['prescribedQuantity']=this.treatmentForm.value.med_quantity;
  this.medicinesNewdata['dose']=this.treatmentForm.value.med_dose;
  this.medicinesNewdata['prandial']=this.treatmentForm.value.med_parandials;
  this.medicinesNewdata['remarks']=this.treatmentForm.value.med_remark;

  this.medicinesNewdata['medicineID']=this.medicID;
  this.medicinesNewdata['issuedQuantity']='';
  this.medicinesNewdata['duration']='';
  
  console.log('medicinesNewdata==',this.medicinesNewdata);
  this.medicinesFinal.push(this.medicinesNewdata);
  console.log('medicinesFinal==',this.medicinesFinal);
  this.medicinesNewdata={};
  this.treatmentForm.reset();
}

deleteTest(tId){
  this.loaderLab= true;
  
  
  this.model12.id=tId;
  
  
 console.log('model12 ==', this.model12);
  this.wardService.deletTest(this.model12).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
      // this.medicinesFinal=[];
     // this.pathArrNew=[];
      //this.pathArrNew_added=false;
       // this.getoutDoorData();
        alert('Done Successfully');
        this.loaderLab = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderLab = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
      }
    },
    (error) => {}
  );
}
removeArr(indx){
  this.medicinesFinal.splice(indx, 1);
  console.log('$x==',this.medicinesFinal)
}
// add new diagnisis
addnewDiag(dia){
  console.log('new diag==',dia);
  this.diagObj.description=dia;
  this.diagnosArr.push(this.diagObj);
  console.log('diagnosArr==',this.diagnosArr);
  this.outdoorForm.controls.diagnosis.reset();
  this.outdoorForm.controls.description.reset();
  this.diagObj=={};

  // this.outdoorForm.patchValue({
  //   diagnosis: '',
  //   description: '',
    
  // });
}
onSelectDiagnos(edat){
  console.log('edat',edat.item);
  
 // this.diagnosArr.push(edat.item);
    this.diagObj=edat.item;
  //  this.diagObj['id']=edat.item.id; 
  //  console.log('this.diagObj5555',this.diagObj);
  //  this.diagnosArr.push({"name":edat.item.name,"id":edat.item.id});
  //  console.log('this.diagnosArr',this.diagnosArr);
   //this.diagnosArr.push(this.diagObj);
  //  this.outdoorForm.patchValue({
  //   diagnosis: '',
    
  // });
  console.log('this.diagnosArr22',this.diagnosArr);
}
removeDiag(indx){
  this.diagnosArr.splice(indx, 1);
  console.log('$x==',this.diagnosArr)
}

// pathology addind data 
onSelectPathology(path){
  this.pathArrNew_added=true;
 
  console.log("pathology data===",path.item);
  this.pathArrNew.push({"result":"","patientID":this.detailsData.patientID,"testName":path.item.testName,"testID":path.item.testID,"testType":path.item.testType,"refRange":path.item.refRange,"isSupper":path.item.isSupper,"subTests":path.item.subTests?path.item.subTests:[]})
  //this.pathArrNew.push(path.item);
  this.objPath={};
  console.log("this.pathArrNew===",this.pathArrNew);
  // this.medicID=medic.item.v.itemID;
  // this.treatmentForm.patchValue({
  //   med_unit: medic.item.v.unit,
  //   med_type: medic.item.v.type, 
    
  // });
  
 
}
removeTests(index,obj){

  // this.pathArrNew.splice(indx, 1);
  // console.log('$x==',this.pathArrNew)
  // if(iddata!=undefined){
  //  this.deleteTest(iddata);
  // }
 
  // console.log('$x222==',iddata);
  let idsArr=[]
  if(obj.subTests!=undefined && obj.subTests.length>0){
for(let sb of obj.subTests)
  { 
     idsArr.push(sb.id)
  }
  idsArr[obj.subTests.length+1]=obj.id

}
else
{
  idsArr.push(obj.id)
}
  if (index > -1) {
    this.pathArrNew.splice(index, 1);
    if(idsArr.length>0)
    this.deleteTest(idsArr);

  }
  
}
getType(typ){
  console.log("type data===",typ);
  this.radTypeObj=typ;
  console.log("type data===",this.radTypeObj);
  this.getoutDoorData();
}
//=============================
gotoDischarge(disform,outForm){
  console.log("disform===",disform);
  console.log("outform===",outForm);
  localStorage.setItem('disData',JSON.stringify(disform));
  localStorage.setItem('outData',JSON.stringify(outForm));
  localStorage.setItem('diagnosArr',JSON.stringify(this.diagnosArr));

  
  
  localStorage.setItem('prescriptionID',this.outdoorData.prescriptionID);
  
  this.router.navigate(['/ward-list/discharged-med'])
}
//==================
updateToken(){
  this.loaderLab= true;
  this.model122.isPrescribed=2;
  this.model122.ptID=this.detailsData.ptID;
 console.log('model121 ==', this.model122);
  this.wardService.updatePatientToken(this.model122).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
        // alert('Done Successfully');
        this.loaderLab = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderLab = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
      }
    },
    (error) => {}
  );
}
}
