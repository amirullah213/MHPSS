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
  model4: any = {};
  modalRef: BsModalRef;
  modal3: any ={};
  allpathology: any = [];
  loader_eqp: boolean = false;
  errormsg: string;
  userData:any={};
  testID:number;
  subObj:any ={};
  attsArr:any =[];
  
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
    this.modalRef = this.modalService.show(
      addmod,
      Object.assign({}, { class: 'modal-lg' })
    );
  }
  openModedit(pathEdit: TemplateRef<any>,edtObj) {
     this.userData = edtObj;
    this.modalRef = this.modalService.show(pathEdit, Object.assign({}, { class: 'modal-lg' }, this.userData));
    console.log('med data====',this.userData);
    this.showEditData(this.userData,)
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(deletepathology: TemplateRef<any>,dataOb) {
    this.testID = dataOb.testID;
    this.modalRef = this.modalService.show(deletepathology, Object.assign({}, { class: 'modal-sm' }, this.userData));
    console.log('med id====',this.testID);
  }
  viewTestsModal(pathEdit: TemplateRef<any>,edtObj) {
    this.userData = edtObj.subTests;
    this.modalRef = this.modalService.show(pathEdit, Object.assign({}, { class: 'modal-lg' }));
   console.log('med data====',this.userData);
  // this.showEditData(this.userData)
   // this.modalRef.content.userActivate = 'Close';
 }
  showEditData(edtObj){
    this.EmedOb.testID=edtObj.testID;
    this.EmedOb.Ename=edtObj.testName;
    this.EmedOb.Erange=edtObj.refRange;
    this.EmedOb.Efee=edtObj.fee;
    this.EmedOb.EisSupper=edtObj.status;
    
    
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
 addnewTest(objmed) {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
      this.modal3.isSupper = objmed.isSupper;
      this.modal3.testName = objmed.name;
      this.modal3.refRange = objmed.range;
      this.modal3.fee = objmed.fee;
      this.modal3.subTests = this.attsArr;
      
     
    //  console.log('test==',this.model)

    this.adminService.addTest(this.modal3).subscribe(
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
  deleteTest() {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
      this.model4.testID = this.testID;
      console.log('test==',this.model)

    this.adminService.delTest(this.model4).subscribe(
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
   updateTest(objmed) {
    
    this.loader_eqp = true;

    this.model2.testID =  this.EmedOb.testID;
    this.model2.testName =  objmed.Ename;
    this.model2.refRange =  objmed.Erange;
    this.model2.fee =  objmed.Efee;
    this.model2.status =  objmed.EisSupper;
   
  
    
    console.log('test==', this.model2);

    this.adminService.updateTest(this.model2).subscribe(
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

   //add attributes to array

   subtestArr(atr){
     //atr = atr.trim();
    // atr = atr.replace(/\s+/g, "_");
    this.attsArr.push(atr);
    console.log('$attarr==',this.attsArr);
    this.subObj={};
  }
// remove attributes from array

removeArr(indx){
   
  this.attsArr.splice(indx, 1);
  console.log('$x==',this.attsArr)
}
}
