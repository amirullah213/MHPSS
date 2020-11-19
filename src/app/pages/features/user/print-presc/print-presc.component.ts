import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../../core';
import { UserService } from '../user.service';


@Component({
  selector: 'ncri-print-presc',
  templateUrl: './print-presc.component.html',
  styleUrls: ['./print-presc.component.scss']
})
export class PrintPrescComponent implements OnInit {

  printPage() {
    window.print();
  }
  
  userLoader: boolean;
  diagnosisArr: any=[];
  userList: any=[];
  param: { crp: any; hospitalID: any; };
  patInfo: any;

  constructor(
    private uService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.patInfo = JSON.parse(localStorage.getItem("patData"));  
    this.getPatPrescrib(this.patInfo);
  }
  //patient prescription list
  getPatPrescrib(obj:any) {
    this.param={'crp':obj.token,'hospitalID':obj.hospitalID};
    this.userLoader = true;
    this.uService.getOpdTicket(this.param).subscribe
    ((response:any)=> {
      if(response.status === 0 ){
        console.log(response );
        this.userList = response.data;
        // if(this.userList.length!=0 && this.userList[0].test.length!=0){
        //   console.log('userPresc list===',JSON.parse(this.userList[0].test[2].xrayFilms6) );
        //   this.diagnosisArr=JSON.parse(this.userList[0].test[2].xrayFilms6)
        // }
        //  this.diagnosisArr.forEach(function (value) {
        //  console.log("diagnosisArr",value);
        // this.daig.push(value);
        // console.log("this.daig",this.daig);
        //  })
        this.userLoader = false;
      }
      else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
    (error) => {}
    );
  }
}