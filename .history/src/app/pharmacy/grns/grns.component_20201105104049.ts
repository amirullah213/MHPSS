import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';

@Component({
  selector: 'ncri-grns',
  templateUrl: './grns.component.html',
  styleUrls: ['./grns.component.scss']
})
export class GrnsComponent implements OnInit {
  hospitalID:any;
  doctorID:any;
  userType:any;
  loader_eqp:boolean=false;
  pharmacyData:any=[];
  modal:any={};
  errormsg:any;
  grnobj1:any={};
  grnobj:any={};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pharmacySer:PharmacyServicesService
    
  ) {}

  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');

  }

   //get all diagnostic list
   getPendingPurOrders(patObj) {
  this.loader_eqp = true;
  
 this.pharmacySer.getMidicines(patObj).subscribe(
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
onSelectMedics(ob)
{
  console.log('medics data selected==',ob.item);
  this.grnobj.unit=ob.item.unit;
  this.grnobj.type=ob.item.type;
  this.grnobj.itemID=ob.item.itemID;
  
}

}
