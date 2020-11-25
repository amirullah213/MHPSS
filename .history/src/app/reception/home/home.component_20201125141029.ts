import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReceptServiceService } from '../services/recept-service.service';
import { DatePipe } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
// import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isCollapsed = true;

  // currentDate = new Date();
  // form = new FormGroup({
  //   dateYMD: new FormControl(new Date()),
  //   dateFull: new FormControl(new Date()),
  //   dateMDY: new FormControl(new Date()),
  //   dateRange: new FormControl([
  //     new Date(),
  //     new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))
  //   ])
  // });

  model: any = {};
  modalRef: BsModalRef;
  hospitalID: any;
  doctorID: any;
  regisForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  userArray: any = [];
  loaderCNIC: boolean = false;
  errormsg: any;
  nicResponseArray: any = [];
  tokenResponseObj: any = {};
  model1: any = {};
  loaderToken: boolean = false;
  model2: any = {};
  loaderNew: boolean = false;
  loaderDists: boolean = false;
  model3: any = {};
  distResponseArray: any = [];
  model4: any = {};
  loaderTehsil: boolean = false;
  tehsilsResponseArray: any = [];
  loaderUc: boolean = false;
  model5: any = {};
  ucResponseArray: any = [];
  ucID: any;
  newResponsearr: any = [];
  newDOB: any;
  yr: any = 0;
  mn: any = 6;
  showdob: boolean = false;
  showaddmsg: boolean = true;
 showAlert: boolean = false;;
 dismissible = true;
 alerts:any={};

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private receptService: ReceptServiceService,
    private router: Router,
    private datePipe: DatePipe,
    // private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    // this.showSuccess();
    this.delay();
    this.GetBirthDate();
    
    this.hospitalID = localStorage.getItem('hospitalID');
    this.doctorID = localStorage.getItem('docId');

    this.searchForm = this.fb.group({
      cnic: ['', [Validators.required,Validators.minLength(13), Validators.maxLength(13)]],
      token: ['', Validators.required],
      
    },
    

    );

    
    this.getAllDists();
    this.regisForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        f_hName: ['', Validators.required],
        dob: [''],
        cellNo: [''],
        gender: ['', Validators.required],
        cnic: ['', [Validators.minLength(13), Validators.maxLength(13)]],
        address: [''],
        village: [''],
        district: [''],
        tehsil_city: [''],
        uc: [''],
        year: [''],
        months: [''],
      },
    );
  }
  GetBirthDate() {
    // this.yr = this.yr.replace(/^\s+|\s+$/g, "");
    // this.mn = this.mn.replace(/^\s+|\s+$/g, "");
    // this.dy = this.dy.replace(/^\s+|\s+$/g, "");
    console.log(' this.yr', this.yr)
    if (this.mn < 10) { this.mn = '0' + this.mn }
    // alert(new Date(new Date().getFullYear() - this.yr, new Date().getMonth()  - this.mn ));
    this.newDOB = this.datePipe.transform(new Date(new Date().getFullYear() - this.yr, new Date().getMonth() - this.mn), "yyyy-MM-dd");
    console.log('this.newDOB', this.newDOB)
  }
  openModAdd(captureuser: TemplateRef<any>) {
    this.modalRef = this.modalService.show(captureuser, Object.assign({}, { class: 'gray modal-lg' }));

  }

  //---------------------search by cnic---------------------
  serchBycnic(cc) {
    this.loaderCNIC = true;
    this.model.hospitalID = this.hospitalID;
    this.model.cnic = this.searchForm.value.cnic;
    // this.model.token=this.searchForm.value.token;
    console.log('model ==', this.model);
    this.receptService.searchBycnic(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log(' response====', response);
          // response.medicines.forEach(v => {
          //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
          //   this.gettreatmetData.push({"itemName":this.medStr,v});
          //   // console.log('gettreatmetData==',this.gettreatmetData)
          // });
          this.nicResponseArray = response.data;
          console.log('this.cnicresponseArray==', this.nicResponseArray);
          this.openModAdd(cc);
          this.loaderCNIC = false;

        }
        if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderCNIC = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    );
  }
  //--------------------------------

  //---------------------search by token---------------------
  serchByToken(cc) {
    this.loaderToken = true;
    this.model1.hospitalID = this.hospitalID;
    this.model1.tokenID = this.searchForm.value.token;
    // this.model.token=this.searchForm.value.token;
    console.log('model1 ==', this.model1);
    this.receptService.searchByTokenPMS(this.model1).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log(' response2====', response);
          this.tokenResponseObj = response.data;
          console.log('this.tokenResponseArray==', this.tokenResponseObj);
          this.openModAdd(cc);
          this.loaderToken = false;
        }
        if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderToken = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);
        }
      },
      (error) => { }
    );
  }

  //--------------------------------

  clear() {
    this.regisForm.reset();
  }

  //---------------------search by token---------------------
  registerNewPat(formval) {
    console.log('month year',formval.year +"   " +formval.months +"   "+formval.tehsil_city)
   this.showaddmsg = false;
    if (formval.dob == null || 'null' || undefined || '') {
    if(formval.year==null || ''){this.yr=0}else{
      this.yr = formval.year;
    }
    if(formval.months==null || ''){this.mn=0}else{
      this.mn = formval.months;
    }
      
      if (this.mn < 10) { this.mn = '0' + this.mn }
      this.newDOB = this.datePipe.transform(new Date(new Date().getFullYear() - this.yr, new Date().getMonth() - this.mn), "yyyy-MM-dd");
      console.log('this.newDOB', this.newDOB)

    } else {
      this.newDOB = this.datePipe.transform(formval.dob, "yyyy-MM-dd");
    }
   if ((formval.dob != '' && formval.dob != undefined && formval.dob != null) || (formval.year != '' && formval.year != undefined && formval.year != null) || (formval.months != '' && formval.months != undefined && formval.months != null)) {

     this.showdob = true;
     } else {
      this.showdob = false;
     }

    this.loaderNew = true;
    this.model2.hospitalID = this.hospitalID;
    this.model2.firstname = formval.firstname;
    this.model2.lastname = '';
    this.model2.dob = this.newDOB;
    this.model2.f_hName = formval.f_hName;
    this.model2.cellNo = formval.cellNo || '';
    this.model2.gender = formval.gender;
    this.model2.cnic = formval.cnic || '';
    this.model2.village = formval.village || '';
    this.model2.uc = formval.uc || '';

    if(formval.tehsil_city==null){
      this.model2.tehsil_city='';
    }else{
      this.model2.tehsil_city = formval.tehsil_city.name;
    }
     if(formval.district==null){
      this.model2.district='';
     }else{
      this.model2.district = formval.district.name ;
     }
    
    this.model2.address = formval.address || '';
    // this.model2.age  =this.searchForm.value.token;

     if (this.showdob==true) {
      
   

    console.log('model2 ==', this.model2);
    this.receptService.insertpatientpms(this.model2).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log(' response2====', response);

          this.newResponsearr = response.patientID;
          this.model2.patientID = this.newResponsearr;
          console.log("idpat====", this.newResponsearr)

          this.loaderNew = false;
          this.regisForm.reset();
          localStorage.setItem('paDetails', JSON.stringify(this.model2));
          this.router.navigate(['reception/old-regis'])


        }
        if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderNew = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    );
    }else{
      alert('Enter DOB or age in year or months')
    
    }
  }
  //-------------------goto next page
  gotopatdetailsDetails(obpat) {
    console.log("patData===", obpat,)
    localStorage.setItem('paDetails', JSON.stringify(obpat));
    this.modalRef.hide();
    //localStorage.setItem('tab',this.tab);
    this.router.navigate(['reception/old-regis'])
  }
  //-------------------goto next page

  //---------------get dists-------
  //---------------------search by cnic---------------------
  getAllDists() {
    this.loaderDists = true;
    this.model3.hospitalID = this.hospitalID;

    console.log('model3 ==', this.model3);
    this.receptService.getDists(this.model3).subscribe(
      (response: any) => {
        if (response.status === 0) {

          this.distResponseArray = response.data;
          console.log('this.distResponseArray==', this.distResponseArray);
          this.loaderDists = false;

        }
        if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderDists = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    );

  }
  //--------get dists-----------
  //---------------------search by cnic---------------------
  getDistTehsils(did) {
    this.loaderTehsil = true;
    this.model4.hospitalID = this.hospitalID;
    this.model4.districtID = did;

    console.log('model4 ==', this.model4);
    this.receptService.gettehsil(this.model4).subscribe(
      (response: any) => {
        if (response.status === 0) {

          this.tehsilsResponseArray = response.data;
          console.log('this.tehsilsResponseArray==', this.tehsilsResponseArray);
          this.loaderTehsil = false;

        }
        if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderTehsil = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    );

  }
  //--------get dists-----------

  //---------------------search by cnic---------------------
  getUCs(did) {
    this.loaderUc = true;
    this.model5.hospitalID = this.hospitalID;
    this.model5.tehsilID = did;

    console.log('model5 ==', this.model5);
    this.receptService.getUC(this.model5).subscribe(
      (response: any) => {
        if (response.status === 0) {

          this.ucResponseArray = response.data;
          console.log('this.ucResponseArray==', this.ucResponseArray);
          this.loaderUc = false;

        }
        if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderUc = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    );

  }
  //--------get dists-----------
  //----reset form
  resetForm() {
    this.regisForm.reset();
  }
  //reset form

  onselectDist(distId) {

    console.log("dist data===", distId);
    this.getDistTehsils(distId.id);
  }

  onselectTehsil(tehId) {
    console.log("tehsil data===", tehId);
    this.getUCs(tehId.id);
  }
  onselectUC(ucId) {
    console.log("uc data===", ucId);
    this.ucID = ucId;
    // this.getUCs(ucId);
  }
  //toaster function calling
  // showSuccess() {
  //   this.toastr.success('done suuccsefully');
  // }
  

  showAlertFunc(){
    this.showAlert=true;

  }
  alertSuccess(){
   // this.showAlert=true;
   alert('claed')
    this.alerts = {
      type: 'success',
      msg: `Well done! You successfully read this important alert message. (added: ${new Date().toLocaleTimeString()})`,
     // timeout: 3000
    };
  }
  alertDanger(){
    this.showAlert=true;
    this.alerts = {
      type: 'danger',
      msg: `Well done! You successfully read this important alert message. (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    };
  }
  onClosed(dismissedAlert: any): void {
   // this.alerts = !== dismissedAlert
  }
  delay(){
  setTimeout(function(){
    alert("Sup!"); 
 }, 5000);
}

}