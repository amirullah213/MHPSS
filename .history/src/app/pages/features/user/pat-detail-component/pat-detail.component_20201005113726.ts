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
  clicnicalInformation: FormGroup;
  investigationInformation: FormGroup;
  treatmentInformation: FormGroup;
  complaints: FormGroup;
  pastHistory: FormGroup;
  familyHistory: FormGroup;
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
      this.clicnicalInformation = this.fb.group({
        bps: ['', Validators.required],
        pulse : ['', Validators.required],
        weight : ['', Validators.required],
        // validates date format yyyy-mm-dd
        height : ['', Validators.required],
        temperature: ['', Validators.required],
        oxygen_saturation: ['', [Validators.required, Validators.minLength(6)]],
        isFollowUp : [false, Validators.required],
        isMalnutration : [false, Validators.requiredTrue],
  
        // complaints : this.fb.group({
          
        //   durationType : ['', Validators.required],
        //   duration : ['', Validators.required],
        //   name : ['', Validators.required],
          
        //  }),
        // pastHistory : this.fb.group({
        //   Abortion : [false, Validators.required],
        //   Allegory : [false],
        //   Astama : [false],
        //   Cancer : [false],
        //   Diabetes : [false],
        //   DrugAllergy : [false],
        //   HyperTension : [false],
        //   IschemicHeartDiseases : [false],
        //   IUD : [false],
        //   misCarriage : [false],
        //   stillBirth : [false],
        //   twins : [true],
         
        //  }),
        //  familyHistory : this.fb.group({
        //   Astama1 : [false],
        //   Cancer1 : [false],
        //   Diabetes1 : [false],
        //   DrugAllergy1 : [false],
        //   HyperTension1 : [false],
        //   IschemicHeartDiseases1 : [true],
         
        //  }),
        // complaints : ['', Validators.requiredTrue],
       
        signs : ['', Validators.requiredTrue],
        signsArr : ['', Validators.requiredTrue],
        diagnosis  : ['', Validators.requiredTrue],
        
          
    //}, {
        // validator: MustMatch('password', 'confirmPassword')
    });

  }

  ngOnInit(): void {

    this.patInfo= JSON.parse(localStorage.getItem("patData"));
    console.log('patInfo====',this.patInfo)
    this.getPatPrescrib(this.patInfo);
     
  }
  get f() { 
    console.log('this.clicnicalInformation.controls===',this.clicnicalInformation.controls)
    return this.clicnicalInformation.controls; }
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
gotoPresDetails(udata){
  localStorage.setItem('uPresData',udata);
  this.router.navigate(['doctor/user/print-presc'])
}
  
  
  
  
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
