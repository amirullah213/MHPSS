import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../../core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';  
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';


@Component({
  selector: 'ncri-create-user',
  templateUrl: './pat-detail.component.html',
  styleUrls: ['./pat-detail.component.scss']
})
export class PatDetailComponent implements OnInit {
  tab: string = 'biofh'
  selectedValueDiag: string;  
  diagnosis: any[];
  localSymptoms: any[]=[];
  anotherArray: any[]=[];
  selectedValueSign: string;  
    signsD: any[];
    selectedValueSymptom:string;
    symptomsD:any[];
  diagnosisData: any;
  symptomsData: any;
  signsData: any;
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
  objp:any ={}
  param: any = {};
  selectedUser: any;
  st: void;
  selectedOption: any;
  selectedOptionSymptom: any;
  constructor(
    private fb: FormBuilder,
     private auth: AuthService,
     private uService: UserService,
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
        signsF : ['', Validators.requiredTrue],
        signsArr : ['', Validators.requiredTrue],
        diagnosis  : ['', Validators.requiredTrue],
        duration:['',Validators.required],
        durationType:['',Validators.required],
        selectedValueSymptom:['']
        
        
    });

  }

  ngOnInit(): void {

    this.patInfo= JSON.parse(localStorage.getItem("patData"));
    this.getclinicalinfo(localStorage.getItem('hospitalID'),this.patInfo.prescriptionID);
    this.getPatPrescrib(this.patInfo);
     
  }
  onSelectDiag(event: TypeaheadMatch): void {  
      
    //this.selectedOption = event.item;  
  } 
  onSelectSign(event: TypeaheadMatch): void {  
      
    // this.selectedOption = event.item;  
   } 

   onSelectSymptom(event: TypeaheadMatch): void {  
      
    debugger
     this.selectedOptionSymptom = event.item;  
   } 
  
   getclinicalinfo(obj:any, obj1:any) {
  
    this.param={'hospitalID':obj,'prescriptionID':obj1};
    
     this.userLoader = true;
     this.uService.getclinicalinfo(this.param).subscribe
     ((response:any)=> {
     if(response.status === 0 ){
         this.diagnosisData = response.diagnosis;
         this.diagnosis = this.diagnosisData;    
         this.signsData = response.signs;
         this.signsD=this.signsData;
         this.symptomsData = response.symptoms;
         this.symptomsD=this.symptomsData;
        this.userLoader = false;
       } else {
         this.userLoader = false;
         alert('Something went wrong try again');
       }
     },
     (error) => {}
   );
  }
  getSymptoms(){
    
   this.localSymptoms;
    
    }

    addSymptoms(obj:any){
    
      this.localSymptoms.push(this.clicnicalInformation.value)  
      //   localStorage.setItem("data",JSON.stringify(this.localSymptoms));
      // this.st =JSON.parse(localStorage.getItem('data'));
      // this.anotherArray.push(this.st); 
      this.getSymptoms();
      
      }

    removeItem(obj:any){
      debugger
const index = this.localSymptoms.indexOf(5);
if (index > -1) {
  this.localSymptoms.splice(index, 1);
}
      console.log(this.localSymptoms);

      //   localStorage.setItem("data",JSON.stringify(this.localSymptoms));
      // this.st =JSON.parse(localStorage.getItem('data'));
      // this.anotherArray.push(this.st); 
      
      
      }
  get f() { 
    return this.clicnicalInformation.controls; }
  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }
 
   //patient prescription list
   getPatPrescrib(obj:any) {

     this.param={'patientID':obj.patientID,'hospitalID':obj.hospitalID};
     
      this.userLoader = true;
      this.uService.getPatPrescription(this.param).subscribe
      ((response:any)=> {
      if(response.status === 0 ){
          console.log(response );
          this.userList = response.data;
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
  localStorage.setItem('uPresData',JSON.stringify(udata) );
  this.router.navigate(['doctor/user/print-presc'])
}
  


  
  
   getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
}
  addUser(obj:any){
    this.error = false;
    this.uService.createUser(obj).subscribe((res) => {
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
    this.uService.editUser(obj).subscribe((res) => {
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