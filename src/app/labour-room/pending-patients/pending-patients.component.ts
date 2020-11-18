import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LabourRoomSerivce } from '../labour-room.service';

@Component({
  selector: 'ncri-pending-patients',
  templateUrl: './pending-patients.component.html',
  styleUrls: ['./pending-patients.component.scss']
})
export class PendingPatientsComponent implements OnInit {

  OpLab: FormGroup;
  userLoader: boolean;
  param:any
  patInfo: any;
  isOtherShow: boolean=false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private labrService : LabourRoomSerivce
  ) {
  

    this.OpLab = this.fb.group({
      parity: [''],
      isPPH: [''],
      isRupture:[''],
      isProlonged: [''],
      isAbortion: [''],
      isOther:[''],
      isDeath:[''],
      isEclampsia:[''],
      isPerperal:[''],
      isEctopic:[''],
      isAPH:[''],
      otherDiagnostics:['']

    });
   
   }

  ngOnInit(): void {
    
    this.patInfo= JSON.parse(localStorage.getItem("patData"));
    this.getobstetric();

  }
  get f() {
    return this.OpLab.controls;
  }
 
  admitobstetric(){
    let opl = this.OpLab.value;   
    
    this.userLoader = true;

    this.param= {"isPPH": opl.isPPH?1:0,"patientID":this.patInfo.patientID,"parity":opl.parity,"isEclampsia":opl.isEclampsia?1:0,"isPerperal":opl.isPerperal?1:0,"otherDiagnostics":opl.otherDiagnostics,"departmentID":this.patInfo.departmentID,"isRupture":opl.isRupture?1:0,"isEctopic":opl.isEctopic?1:0,"token":this.patInfo.ptID,"isAbortion":opl.isAbortion?1:0,"isAPH":opl.isAPH?1:0,"isDeath":opl.isDeath?1:0,"isProlonged":opl.isProlonged?1:0,"hospitalID":this.patInfo.hospitalID}
    this.labrService.admitobstetric(this.param).subscribe

    ((response: any) => {
      if (response.status === 0) {
        localStorage.setItem("tab",'penPats')
        this.router.navigate(['/labour-room/home'])
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
}

getobstetric(){
  let opl = this.OpLab.value;
  this.userLoader = true;

  this.param= {"token":this.patInfo.ptID,"hospitalID":this.patInfo.hospitalID}
  this.labrService.getobstetric(this.param).subscribe

  ((response: any) => {
    if (response.status === 0) {
      
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
