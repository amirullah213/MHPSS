import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AfterViewInit,  ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminServiceService } from '../services/admin-service.service';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'ncri-pathology-list',
  templateUrl: './pathology-list.component.html',
  styleUrls: ['./pathology-list.component.scss']
})
export class PathologyListComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  medOb: any = {};
  EmedOb:any ={}
  
  dtOptions: any = {};
  model: any = {};
  model2: any = {};
  modalRef: BsModalRef;
  
  allpathology: any = [];
  loader_eqp: boolean = false;
  errormsg: string;
  userData:any={};
  compID:number;
  
  dtInstance: DataTables.Api;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  //dtTrigger: Subject = new Subject();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private modalService: BsModalService,
    private adminService: AdminServiceService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      dom: 'lBfrtip',
     // buttons: ['print', 'excel'],
    };
    this.getAllPathList();
  }
 
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  openModAdd(addmod: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(addmod);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(SignsEdit: TemplateRef<any>,edtObj) {
     this.userData = edtObj;
    this.modalRef = this.modalService.show(SignsEdit);
    console.log('med data====',this.userData);
    this.showEditData(this.userData)
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(Complaintsdelete: TemplateRef<any>,dataOb) {
    this.compID = dataOb.id;
    this.modalRef = this.modalService.show(Complaintsdelete);
    console.log('med id====',this.compID);
  }
  viewTestsModal(SignsEdit: TemplateRef<any>,edtObj) {
    this.userData = edtObj;
   this.modalRef = this.modalService.show(SignsEdit);
   console.log('med data====',this.userData);
   this.showEditData(this.userData)
   // this.modalRef.content.userActivate = 'Close';
 }
  showEditData(edtObj){
    this.EmedOb.id=edtObj.id;
    this.EmedOb.Ename=edtObj.name;
    
  }
   //get all medicine  List
   getAllPathList() {
    this.loader_eqp = true;
this.model.testType=1;
    this.adminService.getPatology(this.model).subscribe(
     
      (response: any) => {
        if (response.status === 0) {
          this.allpathology = response.data;
          console.log('all allpathology==', this.allpathology);
         
          //setTimeout(this.rerender, 2500);
         // if(this.allMedcis.length>1){this.rerender();}
          
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
   //get all medicine  List

 //add new medicine  List
 addNewCom(objmed) {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
      this.model.name = objmed.name;
     
    //  console.log('test==',this.model)

    this.adminService.addComp(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
            this.loader_eqp = false;
            this.getAllPathList();
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
   //add new medicine  List

   //get all user List
  deleteComp() {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
      this.model.id = this.compID;
      console.log('test==',this.model)

    this.adminService.deleteComp(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
         // this.allUsers = response.data;
         
          // this.dataFromServer = response['data']['Coords'];
          // Calling the DT trigger to manually render the table
          this.getAllPathList();
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
   //update medic
   updateComp(objmed) {
    this.loader_eqp = true;

    this.model2.id =  this.EmedOb.id;
    this.model2.name =  objmed.Ename;
  
    
    console.log('test==', this.model2);

    this.adminService.updateComp(this.model2).subscribe(
      (response: any) => {
        if (response.status === 0) {
         // this.allUsers = response.data;
         //this.dtTrigger.next();
          this.loader_eqp = false;
          this.getAllPathList();
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
  //update medic
}
