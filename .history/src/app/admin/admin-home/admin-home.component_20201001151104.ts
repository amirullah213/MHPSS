
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
 import { Subject } from 'rxjs';
 import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//import { Subject } from 'rxjs/Observable';
// import { AllequipService } from '../../services/login/allequip.service';
// import { LoginserviceService } from '../../services/login/loginservice.service';

@Component({
  selector: 'ncri-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  dtOptions: any = {};
  model:any={};
  allHospitals:any=[];
  loader_eqp:boolean=false;
  errormsg:string;
// We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  // dtTrigger: Subject = new Subject();
  dtTrigger: Subject<any> = new Subject();
  constructor(
    // public router: Router,
    // public _AllequipService:AllequipService,
    // public _loginserviceService:LoginserviceService,
    ) 
     { }

    ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 25,
        dom: 'lBfrtip',
        buttons: [
         
          'print',
          'excel',
          
        ],
        
       };
      // this.getAllHospitals()
    }
    // getAllHospitals() {
    //   this.loader_eqp=true;
      
    //    console.log('local storage==',localStorage.getItem('auth_token'));
    //    this.model.auth_token =  localStorage.getItem('auth_token');
    //    console.log('test==',this.model)
    //    this._AllequipService.getDataHospList(this.model).subscribe(response => {
         
    //       if (response.status === 0) {
    //        this.allHospitals=JSON.parse(response.data)
    //        console.log('allHospitals==',this.allHospitals)
    //        // this.dataFromServer = response['data']['Coords'];
    //         // Calling the DT trigger to manually render the table
    //          this.dtTrigger.next();
    //          this.loader_eqp=false;
    //       }
   
    //       if (response.status === 1) {
           
    //        this.errormsg = response.errors;
    //         this.loader_eqp=false;
    //         console.log('error=',this.errormsg);
    //         this._loginserviceService.logout();
    //       }
    //    }, error => {
   
         
    //    });
    //  }
   
     ngOnDestroy(): void {
       // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
     }
//goto to staff hospitals
gotoHospTabs(hspid,hspName){
  localStorage.setItem('hspid',hspid);
  localStorage.setItem('hspName',hspName);
  
  // this.router.navigate(['/index/all-tabs-hospitals']);
};
}
