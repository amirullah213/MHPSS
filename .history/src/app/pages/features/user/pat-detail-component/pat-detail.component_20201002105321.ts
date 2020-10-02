import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../../core';


@Component({
  selector: 'ncri-create-user',
  templateUrl: './pat-detail.component.html',
  styleUrls: ['./pat-detail.component.scss']
})
export class PatDetailComponent implements OnInit {
  tab: string = 'employee'
  employeeInformation: FormGroup;
  userLoader: boolean = false;
  userList: any[] = [];
  createUserLoader:boolean=false;
  error: boolean = false;
  errorMessage: any = '';
  patInfo:any ={};

  param: any = {};
  selectedUser: any;
  constructor(
    private fb: FormBuilder,
     private auth: AuthService,
     private service: UserService,
     private router: Router,
     private route: ActivatedRoute
     ) {

  }

  ngOnInit(): void {
    this.patInfo= JSON.parse(localStorage.getItem("patData"));
    console.log('patInfo====',this.patInfo)
    this.getPatPrescrib(this.patInfo);
     
  }
  
  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }
 
   //patient prescription list
   getPatPrescrib(obj:any) {
     this.param={'patientID':obj.patientID,'hospitalID':obj.hospitalID};
     
      this.userLoader = true;
      this.auth.getPatPrescription(this.param).subscribe
      ((response:any)=> {
      if(response.status === 0 ){
          console.log(response );
          this.userList = response.data;
          console.log('userPresc list===',this.userList)
         this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
      (error) => {}
    );
  }
// patient prescription list

  
  
  
  
   getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
}
  addUser(obj:any){
    this.error = false;
    this.service.createUser(obj).subscribe((res) => {
      if(res.status === "success"){
        this.createUserLoader=false;
        this.error = false;
        this.router.navigate(['/user']);
      }else{
        this.createUserLoader=false;
        if(res.errors && res.errors.non_field_errors){
          res.errors.non_field_errors.length > 0 ? this.errorMessage = res.errors.non_field_errors[0] : this.errorMessage = 'Something went wrong try again';
        }else{
          this.errorMessage = 'Something went wrong try again';
        }
        this.error = true;
        //console.log("Something went wrong try again");
      }
    },(error)=>{
      this.createUserLoader=false;
      this.errorMessage = 'Something went wrong try again';
      this.error = true;
    })
  }

  editUser(obj:any){
    this.error = false;
    obj.user_id = this.param.id;
    obj.username = obj.email;
    this.service.editUser(obj).subscribe((res) => {
      if(res.status === "success"){
        this.createUserLoader=false;
        this.error = false;
        this.router.navigate(['/user']);
      }else{
        this.createUserLoader=false;
        if(res.errors && res.errors.non_field_errors){
          res.errors.non_field_errors.length > 0 ? this.errorMessage = res.errors.non_field_errors[0] : this.errorMessage = 'Something went wrong try again';
        }else{
          this.errorMessage = 'Something went wrong try again';
        }
        this.error = true;
        //console.log("Something went wrong try again");
      }
    },(error)=>{
      this.createUserLoader=false;
      this.errorMessage = 'Something went wrong try again';
      this.error = true;
    })
  }

  test($event){
   // debugger;
    console.log($event)
  }

 
}
