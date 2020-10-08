
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AfterViewInit,  ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminServiceService } from '../services/admin-service.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ncri-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.scss']
})
export class AmbulanceComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  medOb: any = {};
  EmedOb:any ={}
  
  dtOptions: any = {};
  model: any = {};
  model2: any = {};
  modalRef: BsModalRef;
  
  allMedcis: any = [];
  loader_eqp: boolean = false;
  errormsg: string;
  userData:any={};
  medicID:number;
  
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
    this.getAllMedics();
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
  openModAdd(pharmaAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(pharmaAdd);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(pharmaEdit: TemplateRef<any>,edtObj) {
     this.userData = edtObj;
    this.modalRef = this.modalService.show(pharmaEdit);
    console.log('med data====',this.userData);
    this.showEditData(this.userData)
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(pharmadelete: TemplateRef<any>,dataOb) {
    this.medicID = dataOb.itemID;
    this.modalRef = this.modalService.show(pharmadelete);
    console.log('med id====',this.medicID);
  }
  showEditData(edtObj){
    this.EmedOb.itemID=edtObj.itemID;
    this.EmedOb.Ename=edtObj.itemName;
    this.EmedOb.Eunit=edtObj.unit;
    this.EmedOb.Etype=edtObj.type;
    
   
  }
   //get all medicine  List
   getAllMedics() {
    this.loader_eqp = true;

    this.adminService.getAllMedicsList(this.model).subscribe(
     
      (response: any) => {
        if (response.status === 0) {
          this.allMedcis = response.data;
          console.log('all medicines==', this.allMedcis);
         
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
 addNewMedic(objmed) {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
      this.model.itemName = objmed.name;
      this.model.unit = objmed.unit;
      this.model.type = objmed.type;
    //  console.log('test==',this.model)

    this.adminService.addNewMedic(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
            this.loader_eqp = false;
            this.getAllMedics();
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
  deleteMedic() {
    this.loader_eqp = true;

    //  console.log('local storage==',localStorage.getItem('auth_token'));
      this.model.itemID = this.medicID;
      console.log('test==',this.model)

    this.adminService.deleteMedic(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
         // this.allUsers = response.data;
         
          // this.dataFromServer = response['data']['Coords'];
          // Calling the DT trigger to manually render the table
          this.getAllMedics();
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
   updateMedic(objmed) {
    this.loader_eqp = true;

    this.model2.itemID =  this.EmedOb.itemID;
    this.model2.itemName =  objmed.Ename;
    this.model2.unit =  objmed.Eunit;
    this.model2.type =  objmed.Etype;
    
    console.log('test==', this.model2);

    this.adminService.updateMed(this.model2).subscribe(
      (response: any) => {
        if (response.status === 0) {
         // this.allUsers = response.data;
         //this.dtTrigger.next();
          this.loader_eqp = false;
          this.getAllMedics();
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

