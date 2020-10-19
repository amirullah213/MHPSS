import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PharmacyServicesService } from '../services/pharmacy-services.service'

@Component({
  selector: 'ncri-pharma-pending-patients',
  templateUrl: './pharma-pending-patients.component.html',
  styleUrls: ['./pharma-pending-patients.component.scss']
})
export class PharmaPendingPatientsComponent implements OnInit {
  loader_eqp:boolean=false;
  pharmacyData:any =[];
  errormsg:string;
  stckobj:any ={};
  isCollapsed = true;
  batchNo: any;
  tabb:string;
  model5:any={};
  medicArr:any =[];
med:any=[];
newArray:any =[];
newArray2:any =[];
newArray3:any =[];
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

  constructor(private modalService: BsModalService, private fb: FormBuilder, private pharmacySer:PharmacyServicesService, private router:Router) {

  }

  ngOnInit(): void {
    let padata=JSON.parse(localStorage.getItem('pharmacyData')) ;
    this.tabb= localStorage.getItem('tab');
    console.log('pharmacyData',padata)

    this.model.hospitalID=localStorage.getItem('hospitalID');
    this.model.parmacyID=localStorage.getItem('docId');
    this.model.token=padata.token;
    
    this.getPharmaPats(this.model);
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
//get all diagnostic list
getPharmaPats(patObj) {
  this.loader_eqp = true;
  
  //this.model5.search=this.selected;
 this.pharmacySer.getPatData(patObj).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.pharmacyData = response;
       
        this.newArray=response.medicines
       
      console.log('this.pharmacy pats==',this.newArray)
       
       for(let i=0;i<this.newArray.length;i++){
        console.log("is.newArray.stock==",this.newArray[i].stock.length);
        if(this.newArray[i].stock.length==0){
          let pushArr:any =[];
          let pushObj:any ={};
          pushObj['stock']=pushArr;
          this.newArray2.push(pushObj);
        }else{

          this.newArray2.push({'stock':this.newArray[i].stock});
         
        }
        console.log("this.newArray2==",this.newArray2);
        this.newArray2.forEach(element => {
        
          this.newArray3=element;
         
          console.log("this.newArray222222",this.newArray3);
        });
        
       }

      
     
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
//get all diagnostic list
getBatch(bno){
  console.log('batch no====',bno );
  this.batchNo=bno.batch;
  this.stckobj.instock=this.batchNo
  // document.getElementById('result').value = this.batchNo;
}


//get all diagnostic list
issueMedicines(patObj) {
  this.loader_eqp = true;
  debugger
  this.model5.hospitalID=localStorage.getItem('hospitalID');
  this.model5.parmacyID=localStorage.getItem('docId');
   this.model5.ptID=this.pharmacyData.data.patientID;
  this.model5.medicine=this.medicArr;

 this.pharmacySer.issueMedic(this.model5).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.pharmacyData = response;
      console.log('this.pharmacy pats==',this.pharmacyData)
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
//get all diagnostic list
addMedicArr(medArr){
console.log('medarry==',medArr);
this.medicArr.push(medArr);
this.med=[];
console.log('new medic array==',this.medicArr)
}
getdata(dataobj){
  console.log('batch data ==',this.newArray3.stock[Number(dataobj)]);
  let medArr:any ={};
  medArr=this.newArray3.stock[Number(dataobj)];
  this.medicArr.push=medArr;
  console.log(' this.medicArr===', this.medicArr)
}


}
