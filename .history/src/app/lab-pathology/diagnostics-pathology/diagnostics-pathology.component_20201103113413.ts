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
  openModalWithClass(template: TemplateRef<any>) {
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
        //   // console.log('gettreatmetData==',this.gettreatmetData)
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

}
