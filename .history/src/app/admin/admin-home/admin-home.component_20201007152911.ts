import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AfterViewInit,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminServiceService } from '../services/admin-service.service';
import { DataTableDirective } from 'angular-datatables';

//import { Subject } from 'rxjs/Observable';
// import { AllequipService } from '../../services/login/allequip.service';
// import { LoginserviceService } from '../../services/login/loginservice.service';

@Component({
  selector: 'ncri-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  userOb: any = {};
  EuserOb:any={};
 // dtOptions: any = {};
  dtOptions: DataTables.Settings = {};
  model: any = {};
  model2: any = {};
  modalRef: BsModalRef;
  investigationInformation: FormGroup;
  allUsers: any = [];
  loader_eqp: boolean = false;
  errormsg: string;
  userData:any={};
  userID:number;
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  //dtTrigger: Subject = new Subject();
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private modalService: BsModalService,
    private adminService: AdminServiceService
  ) {}

  ngOnInit() {
    // setTimeout(function(){ alert("Hi"); }, 2000);

   
    this.getUserList();
  }
 
  rerender(): void {
   
    try {
      //debugger
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
       
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
        
      });
    } catch (err) {
      console.log(err);
    }
  }

  openModAdd(addUser: TemplateRef<any>) {
    //  this.userData = userdata;
     console.log('this.userData====',this.userData);
    this.modalRef = this.modalService.show(addUser,this.userData); //, this.userData  //, data
    
    // this.modalRef.content.userActivate = 'Close';
  }

 

openAddModal(addUser: TemplateRef<any>) {
  
  this.modalRef = this.modalService.show(addUser); 
  
}
  openModedit(usersEdit: TemplateRef<any>,dataOb) {
    //this.modalService.open(usersEdit);
   
     this.userData = dataOb;
    this.modalRef = this.modalService.show(usersEdit, this.userData); //, this.userData  //, data
    console.log('user data====',this.userData);
   this.showEditData(this.userData)
     //this.modalRef.content.userActivate = 'Close';
  }
  openDeleteModal(userdelete: TemplateRef<any>,dataOb) {
    //this.modalService.open(usersEdit);
   
     this.userID = dataOb.id;
    this.modalRef = this.modalService.show(userdelete, this.userData); //, this.userData  //, data
    console.log('user data====',this.userID);
  
     //this.modalRef.content.userActivate = 'Close';
  }
  showEditData(edtObj){
    this.EuserOb.id=edtObj.id;
    this.EuserOb.Ename=edtObj.name;
    this.EuserOb.Edes=edtObj.designation;
    this.EuserOb.Ejoining=edtObj.joiningDate;
    this.EuserOb.Econtact=edtObj.contact;
    this.EuserOb.Euname=edtObj.username;
    this.EuserOb.Epassword=edtObj.password;
    this.EuserOb.Estatus=edtObj.status;
  }
  

  //get all user List
  getUserList() {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
    //  this.model.auth_token =  localStorage.getItem('auth_token');
    //  console.log('test==',this.model)

    this.adminService.getPatList(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.allUsers = response.data;
          console.log('allHospitals==', this.allUsers);
          // this.dataFromServer = response['data']['Coords'];
          // Calling the DT trigger to manually render the table
          // this.dtTrigger.next();
          // this.rerender();
         
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            dom: 'lBfrtip',
           // buttons: ['print', 'excel'],
          };
          this.rerender();
          //this.dtTrigger.next();
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
  //get all user list

  //add new user
  addNewUser(objU) {
    this.loader_eqp = true;

    console.log('object of srvice==', objU);
      this.model2 =  objU
      
    console.log('test==', this.model2);

    this.adminService.addUser(this.model2).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.allUsers = response.data;
         
          // this.dataFromServer = response['data']['Coords'];
          // Calling the DT trigger to manually render the table
          // this.dtTrigger.next();
          this.loader_eqp = false;
        
          this.getUserList();
           this.modalRef.hide();
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
  //add new user

   //delete new user
   updateUser() {
    this.loader_eqp = true;

    this.model2.id =  this.EuserOb.id;
    this.model2.name =  this.EuserOb.Ename;
    this.model2.designation =  this.EuserOb.Edes;
    this.model2.joiningDate =  this.EuserOb.Ejoining;
    this.model2.contact =  this.EuserOb.Econtact;
    this.model2.username =  this.EuserOb.Euname;
    this.model2.password =  this.EuserOb.Epassword;
     this.model2.status =  this.EuserOb.Estatus;
    console.log('test==', this.model2);

    this.adminService.updateUser(this.model2).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.allUsers = response.data;
         //this.dtTrigger.next();
          this.loader_eqp = false;
          this.getUserList();
           this.modalRef.hide();
          // this.modalRef.content.userActivate = 'Close';
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
  //delete new user

  //get all user List
  deleteUser() {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
      this.model.id = this.userID;
      console.log('test==',this.model)

    this.adminService.deleteUser(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.allUsers = response.data;
         
          // this.dataFromServer = response['data']['Coords'];
          // Calling the DT trigger to manually render the table
          this.getUserList();
          this.modalRef.hide();
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
  //get all user list

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  //goto to staff hospitals
  gotoHospTabs(hspid, hspName) {
    localStorage.setItem('hspid', hspid);
    localStorage.setItem('hspName', hspName);

    // this.router.navigate(['/index/all-tabs-hospitals']);
  }
}
