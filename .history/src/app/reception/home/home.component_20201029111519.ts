import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReceptServiceService } from '../services/recept-service.service';

@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
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
  hospitalID:any;
  doctorID:any;
  regisForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  userArray:any =[];
  loaderCNIC:boolean=false;
  errormsg:any;
  nicResponseArray:any=[];


  constructor(
     private modalService: BsModalService,
     private fb: FormBuilder,
     private receptService: ReceptServiceService,
      ) 
  {
    
  }

  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');

    this.searchForm = this.fb.group({
      cnic: ['', Validators.required],
      token: ['', Validators.required],
   },
  
   );
   }
  
  openModAdd(captureuser: TemplateRef<any>) {
    this.modalRef = this.modalService.show(captureuser);
  }

//---------------------search by cnic---------------------
serchBycnic(cc) {
  this.loaderCNIC= true;
  this.model.hospitalID=this.hospitalID;
  this.model.cnic=this.searchForm.value.cnic;
  // this.model.token=this.searchForm.value.token;
  console.log('model ==', this.model);
  this.receptService.searchBycnic(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        // response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //   this.gettreatmetData.push({"itemName":this.medStr,v});
        //   // console.log('gettreatmetData==',this.gettreatmetData)
        // });
        this.nicResponseArray=response.data;
      console.log('this.cnicresponseArray==',this.nicResponseArray);
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
    (error) => {}
  );

}
//--------------------------------
}

