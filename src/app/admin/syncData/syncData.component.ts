import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse'; 
import { AdminServiceService } from '../services/admin-service.service';
import { ConnectionService } from 'ng-connection-service';  


@Component({
  selector: 'syncData',
  templateUrl: './syncData.component.html',
  styleUrls: ['./syncData.component.scss']
})
export class syncDataComponent implements OnInit {
  updatedDataArr: any;
  dataArr: any;
  isConnected = true;  
  noInternetConnection: boolean=false;
  
  loader_eqp:boolean= false;
  reporData:any =[];
  isCollapsed = true;
  errormsg:string;
  medOb:any ={};

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

  constructor(private modalService: BsModalService, private fb: FormBuilder, private adminService:AdminServiceService,
    private connectionService: ConnectionService) {
      this.connectionService.monitor().subscribe(isConnected => {  
        this.isConnected = isConnected;  
        if (this.isConnected) { 
          this.noInternetConnection=false;  
            location.reload();
        }  
        else { 
          alert("No Internet detected. Please Connect to internet") 
          this.noInternetConnection=true;  
        }  
      })  

  }

  ngOnInit(): void {
    var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
console.log('date==',date);
this.medOb.startDate=date;
this.medOb.endtDate=date;

}

   //get all medicine  List
   getlocaldataforsync() {
    
    
      this.adminService.getlocaldataforsync(this.model).subscribe(
     
      (response: any) => {
        if (response.status === 0) {
          this.reporData = response;
          console.log('all reportdata==', this.reporData);
        debugger
          if(this.reporData.data.length==0 && this.reporData.updatedData.length==0)
         {
          
          this.loader_eqp = false;
           alert("Data already Synced")
       
        }
         else
         {
          this.loader_eqp = true;

           this.syncMerfDHIS(this.reporData.data,this.reporData.updatedData)

         }
          
         
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

  updatesyncstatus() {
    
    
      this.adminService.updatesyncstatus(this.model).subscribe(
     
      (response: any) => {
        if (response.status === 0) {
          this.reporData = response;
          this.loader_eqp = false;
         alert("Data Synced successfuly");              
         
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

  
  syncMerfDHIS(data,updata)
  {
    debugger
      let dt = {
        "data":data,
        "updatedData": updata,
  
    };
    let ddt = JSON.stringify(dt)
  
      this.adminService.syncMerfDHIS(dt).subscribe(
       
        (response: any) => {
          if (response.status === 0) {
            this.updatesyncstatus();           
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
   //get all medicine  List
  
  //--------------------------------
}

