import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { WardServiceService } from '../service/ward-service.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

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
  model7:any={};
  getDischargedata1:any=[];
  diagnosArr:any=[];

  //form related variables here
  outdoorForm: FormGroup;
    submitted = false;


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
        // validates date format yyyy-mm-dd
        // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        // email: ['', [Validators.required, Validators.email]],
        // password: ['', [Validators.required, Validators.minLength(6)]],
        // confirmPassword: ['', Validators.required],
        // acceptTerms: [false, Validators.requiredTrue]
    },
    //  {
    //     validator: MustMatch('password', 'confirmPassword')
    // }
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
        this.outdoorData = response.data;
        this.diagnosArr=JSON.parse(this.outdoorData.diagnosis) ;
      console.log('this.outdoorData==',this.outdoorData)
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
        this.gettreatmetData = response;
      console.log('this.gettreatmetData==',this.gettreatmetData)
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

}
