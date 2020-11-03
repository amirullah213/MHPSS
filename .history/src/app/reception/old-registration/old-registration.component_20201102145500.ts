import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReceptServiceService } from '../services/recept-service.service';

@Component({
  selector: 'ncri-old-registration',
  templateUrl: './old-registration.component.html',
  styleUrls: ['./old-registration.component.scss']
})
export class OldRegistrationComponent implements OnInit {
  patDataLocal:any={};
  loaderDoc:boolean=false;
  hospitalID:any;
  doctorID:any;
  docResponseArray:any=[];
  errormsg:any;

  model: any = {};
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private receptService: ReceptServiceService,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.patDataLocal=JSON.parse(localStorage.getItem('paDetails'));
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');

  }
  openModAdd(captureuser: TemplateRef<any>) {
   this.getAllDoctros();
    this.modalRef = this.modalService.show(captureuser);
  }
  openchildMod(childModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(childModal);
  }
  //--------------------get doctor list 
  getAllDoctros() {
    alert('called')
    this.loaderDoc= true;
    this.model.hospitalID=this.hospitalID;
    
    console.log('model ==', this.model);
    this.receptService.getDoctorsList(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
         
           this.docResponseArray=response.data;
           console.log('this.distResponseArray==',this.docResponseArray);
           this.loaderDoc = false;
          
        }
    if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderDoc = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);
          
        }
      },
      (error) => {}
    );
  
  }
  //get doctor list ended

}
