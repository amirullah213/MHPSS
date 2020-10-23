import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { WardServiceService } from '../service/ward-service.service';

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

  //form related variables here
  outdoorForm: FormGroup;
    submitted = false;
    medicArr:any =[];

    treatmentForm:FormGroup;


  constructor(
    private modalService: BsModalService, 
    private fb: FormBuilder,
    private router: Router,
    private wardService:WardServiceService
  ) {

  }
  ngOnInit() {
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
        
        // acceptTerms: [false, Validators.requiredTrue]
    },
    //  {
    //     validator: MustMatch('password', 'confirmPassword')
    // }
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

  openModalActivate(userActivate: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(userActivate, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModalDeactivate(userDeactivate: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(userDeactivate, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }

  openDeleteUser(deleteUser: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(deleteUser, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }
 
 
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
 //get all diagnostic list
 getoutDoorData() {
  this.loader= true;
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
      console.log('this.outdoorData==',this.diagnosArr)
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
//get all diagnostic list
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
        this.outdoorForm.value;
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
onSelectMedics(medic){
  console.log("medic data===",medic.item);
  this.treatmentForm.patchValue({
    med_unit: medic.item.v.unit,
    med_type: medic.item.v.type, 
    
  });

}
addmoreMedics(){
  console.log('treatmentForm values==',this.treatmentForm.value);
  this.medicArr.push(this.treatmentForm.value);
  console.log('medicArr==',this.medicArr);
  this.treatmentForm.reset();
}
removeArr(indx){
  this.medicArr.splice(indx, 1);
  console.log('$x==',this.medicArr)
}
// add new diagnisis
addnewDiag(dia){
  console.log('new diag==',dia)
  this.newDiagArr.push(dia);
  console.log('medicArr==',this.newDiagArr);
  this.outdoorForm.value.diagnosis='';
  this.outdoorForm.patchValue({
    diagnosis: '',
    
  });
}
onSelectDiagnos(edat){
  console.log('edat',edat.item);
  
 // this.diagnosArr.push(edat.item);
   this.diagObj['name']=edat.item.name;
   this.diagObj['id']=edat.item.id; 
   console.log('this.diagObj5555',this.diagObj);
   this.diagnosArr.push(this.diagObj);
   this.outdoorForm.patchValue({
    diagnosis: '',
    
  });
  console.log('this.diagnosArr22',this.diagnosArr);
}
removeDiag(indx){
  this.diagnosArr.splice(indx, 1);
  console.log('$x==',this.diagnosArr)
}
}
