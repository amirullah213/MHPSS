import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import {VitalsService} from "../vitals.service"

@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  param:any;
  patInfo: any;
  userLoader: boolean;
  vitalsData: any=[];
  vForm: FormGroup;

  constructor(private fb: FormBuilder, private vService: VitalsService, private router:Router
    ) {
      this.vForm = this.fb.group({
        bps: [''],
        pulse: [''],
        weight: [''],
        height: [''],
        temperature: [''],
        oxygen_saturation:['']
  
      });
     
     }

  ngOnInit(): void {
    

    this.patInfo = JSON.parse(localStorage.getItem("vitalsData"));
    this.getallpatientvital()
  }

  
  getallpatientvital(){
debugger
     this.param={'prescription_id':this.patInfo.prescriptionID};
    this.vService.getallpatientvital(this.param).subscribe
    ((response:any)=> {
    if(response.status === 0 ){
      
        this.vitalsData = response.data[0];
        this.vForm.patchValue({
          bps: this.vitalsData.bps,
          pulse: this.vitalsData.pulse,
          weight: this.vitalsData.weight,
          height: this.vitalsData.height,
          temperature: this.vitalsData.temperature,
          oxygen_saturation: this.vitalsData.oxygen_saturation,

    
        })
        
       this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
    (error) => {}
  );
  }
  addpatientvital()
  {
    debugger
    let f = this.vForm.value
    this.param={'prescription_id':this.patInfo.prescriptionID,'hospitalID':this.patInfo.hospitalID,"bps":f.bps,"bpd":f.pbd,"pulse":f.pulse,"weight":f.weight,"height":f.height,"temperature":f.temperature,"oxygen_saturation":f.oxygen_saturation};
    this.userLoader = true;
    this.vService.addpatientvital(this.param).subscribe
    ((response:any)=> {
    if(response.status === 0 ){
      this.router.navigate(['/vitals/home']);
        
        
       this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
    (error) => {}
  );
  }
 
  get f() {
    return this.vForm.controls;
  }
}
