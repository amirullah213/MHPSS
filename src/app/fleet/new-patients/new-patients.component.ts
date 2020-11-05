import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {FleetService} from "../fleet.service"
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';


@Component({
  selector: 'ncri-new-patients',
  templateUrl: './new-patients.component.html',
  styleUrls: ['./new-patients.component.scss']
})
export class NewPatientsComponent implements OnInit {
  paramData: any;
  userLoader: boolean;
  ambulanceData: any=[];
  ambulanceList: any=[];
  upForm: FormGroup
  ambId: any;
  newPatInfo: any;
  ptInf: any
  constructor(  private router: Router,private fService:FleetService,    private fb: FormBuilder,
    ) { 
    this.upForm = this.fb.group({
    
      ambulance: ['', Validators.required],
      returntime:['',Validators.required]
    
    });
  }
  get f() {
    return this.upForm.controls;
  }
 
  ngOnInit(): void {
    this.ptInf = localStorage.getItem("newPatData")
     this.newPatInfo=JSON.parse(this.ptInf)
    debugger
    this.getambulances()
  }
 
  onSelectAmb(event: TypeaheadMatch): void {
    debugger
    this.ambId = event.item.id
  }
  updatereferral(){

    this.userLoader=true;
    this.paramData={"id": this.newPatInfo.id,"ambulanceID":this.ambId,"estimatedReturnTime":this.upForm.value.returntime}
    this.fService.updatereferral(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
                this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
  getambulances(){
    this.userLoader=true;
    this.paramData={}
    this.fService.getambulances(this.paramData).subscribe((response: any) => {
      if (response.status === 0) {
        
        this.ambulanceList = response.data
        this.ambulanceList.forEach(e => {
          if(e.status==0)
          this.ambulanceData.push(e);
          
        });
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
  
}
