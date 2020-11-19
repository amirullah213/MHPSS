import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PharmacyServicesService } from '../services/pharmacy-services.service'

@Component({
  selector: 'ncri-sync-data',
  templateUrl: './sync-data.component.html',
  styleUrls: ['./sync-data.component.scss']
})
export class SyncDataComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
     private fb: FormBuilder,
      private pharmacySer:PharmacyServicesService,
       private router:Router) {

  }

  ngOnInit(): void {
    
  //  this.getPharmaPats(this.model);
  }
//get all diagnostic list
// getPharmaPats(patObj) {
//   this.loader_eqp = true;
  
//   //this.model5.search=this.selected;
//  this.pharmacySer.getPatData(patObj).subscribe(
//     (response: any) => {
//       if (response.status === 0) {
//         this.pharmacyData = response;
       
//         this.newArray=response.medicines
       
//       console.log('this.pharmacy pats==',this.newArray)
       
      //  for(let i=0;i<this.newArray.length;i++){
      //   console.log("is.newArray.stock==",this.newArray[i].stock.length);
      //   if(this.newArray[i].stock.length==0){
      //     let pushArr:any =[];
      //     let pushObj:any ={};
      //     pushObj['stock']=pushArr;
      //     this.newArray2.push(pushObj);
      //   }else{

      //     this.newArray2.push({'stock':this.newArray[i].stock});
         
      //   }
      //   console.log("this.newArray2==",this.newArray2);
      //   if(this.newArray2.length!=0){
      //   this.newArray2.forEach(element => {
        
      //     this.newArray3=element;
         
      //     console.log("this.newArray222222",this.newArray3);
      //   });
      // }
      //  }

      
     
//         this.loader_eqp = false;
//       }

//       if (response.status === 1) {
//         this.errormsg = response.errors;
//         this.loader_eqp = false;
//         console.log('error=', this.errormsg);
//         //this._loginserviceService.logout();
//       }
//     },
//     (error) => {}
//   );

// }
}
