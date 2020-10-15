import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PharmacyServicesService } from '../services/pharmacy-services.service';

@Component({
  selector: 'ncri-pharma-seen-patients',
  templateUrl: './pharma-seen-patients.component.html',
  styleUrls: ['./pharma-seen-patients.component.scss']
})
export class PharmaSeenPatientsComponent implements OnInit {
  loader_eqp:boolean=false;
  pharmacyData:any =[];
  errormsg:string;

  isCollapsed = true;

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

  model: any = {};
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private pharmacySer:PharmacyServicesService) {

  }

  ngOnInit(): void {
    this.model.hospitalID=localStorage.getItem('hospitalID');
 
    let padata=localStorage.getItem('pharmacyData');
    console.log('pharmacyData',padata)
    this.getPharmaPats(this.model);
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
//get all diagnostic list
getPharmaPats(patObj) {
  this.loader_eqp = true;
  
  //this.model5.search=this.selected;
 this.pharmacySer.getPatData(patObj).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.pharmacyData = response.data;
      console.log('this.pharmacy pats==',this.pharmacyData)
        
       
        this.loader_eqp = false;
      }

      if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}
//get all diagnostic list

}
