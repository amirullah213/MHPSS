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
  selectedOptionDiag: any;
  selectedOptionSign: any;
  selectedOptionPath: any;
  selectedOptionRad: any;
  localSymptoms: any[]=[];
  localDiag: any[]=[];
  localSign: any[]=[];
  localPath:any[]=[];
  localIndoorData:any[]=[];
  selectedValueSign: string;  
  selectedValueSymptom:string;
  selectedValueDiag: string;  
  selectedValueRad: string;  
  selectedValueRadName: string;  
  selectedValueIndoorDiag: string;  
  pathData:any[]=[];
  diagnosisData: any;
  symptomsData: any;
  signsData: any;
  radData: any[];
  IndoorDiagData:any[];
  radNameData: any[]=[];
  selectedOptionRadName: any;
  selectedOptionIndoorDiag: any;
  vitalsData: any[];
  
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
        selectedValueSymptom:[''],
        selectedValueDiag:[''],
        selectedValuePath:[''],
        selectedValueRad:[''],
        selectedValueRadName:[''],
        selectedValueIndoorDiag:[''],
        Abortion:[''],
        Abortion1:[''],
        Allegory:[''],
        Allegory1:[''],
        Astama:[''],
        Astama1:[''],
        Cancer:[''],
        Cancer1:[''],
        Diabetes:[''],
        Diabetes1:[''],
        DrugAllergy:[''],
        DrugAllergy1:[''],
        HyperTension:[''],
        HyperTension1:[''],
        twins:[''],
        misCarriage:[''],
        misCarriage1:[''],
        IUD:[''],
        stillBirth:[''],
        IschemicHeartDiseases:[''],
        IschemicHeartDiseases1:[''],
        selectedValueSign:[''],
        system_access_enabled:[''],
        Medicine:[''],       
        Diagnosis:[''],
        termination_date:[''],
        Unit:[''],   
        
        
    });
  }

  ngOnInit(): void {
    this.patInfo= JSON.parse(localStorage.getItem("patData"));
    this.getclinicalinfo();
    this.getInvistigation();
    this.getPatPrescrib(this.patInfo);     
  }
  onSelectDiag(event: TypeaheadMatch): void {  
      
    this.selectedOptionDiag= event.item;  
    this.addDiag(this.selectedOptionDiag);

  } 
  onSelectSign(event: TypeaheadMatch): void {  
      
     this.selectedOptionSign = event.item; 
     this.addSign(this.selectedOptionSign);
 
   } 

   onSelectSymptom(event: TypeaheadMatch): void {  
    this.selectedOptionSymptom = event.item; 
   } 

   onSelectPath(event: TypeaheadMatch): void {  
    this.selectedOptionPath = event.item; 
    this.addPath(this.selectedOptionPath);

   } 
   onSelectRad(event: TypeaheadMatch): void {  
    this.selectedOptionRad = event.item; 
    this.addRad(this.selectedOptionRad);

   }  
   onSelectRadName(event: TypeaheadMatch): void {  
    
   this.selectedOptionRadName = event.item; 
   this.addRadName(this.selectedOptionRadName);

  }
  
  onSelectIndoorDiag(event: TypeaheadMatch): void {  
   this.selectedOptionIndoorDiag = event.item; 
   this.addIndoorDiag(this.selectedOptionIndoorDiag);

  }
 
 
 
  
   getclinicalinfo() {
  
    this.param={'hospitalID':localStorage.getItem('hospitalID'),'prescriptionID':this.patInfo.prescriptionID};        
    
     this.userLoader = true;

     this.uService.getclinicalinfo(this.param).subscribe
     ((response:any)=> {
     if(response.status === 0 ){
         this.diagnosisData = response.diagnosis;
         this.signsData = response.signs;
         this.symptomsData = response.symptoms;
         this.vitalsData = response.vitals;
         this.clicnicalInformation.setValue({
           bps:this.vitalsData,
           pulse:this.vitalsData,
           weight:this.vitalsData,
           height:this.vitalsData,
           temperature:this.vitalsData,
           oxygen_saturation:this.vitalsData
           
         })
      console.log(this.vitalsData,"vitals data")
        this.userLoader = false;
       } else {
         this.userLoader = false;
         alert('Something went wrong try again');
       }
     },
     (error) => {}
   );
  }
  addSymptoms(obj:any){
    
    this.localSymptoms.push({'id':obj.id,'name':obj.name,'duration':this.clicnicalInformation.value.duration,'durationType':this.clicnicalInformation.value.durationType})  
       this.clicnicalInformation.reset({
        'duration':'',
       'durationType':"",
      'selectedValueSymptom':''
       })
    }

  removeSymptoms(index){

if (index  >-1) {
this.localSymptoms.splice(index, 1);
}
    

      }

      addDiag(obj:any){
        
    
        this.localDiag.push({'id':obj.id,'name':obj.name})  
        this.clicnicalInformation.reset({         
        'selectedValueDiag':''
         })
        }
    
      removeDiag(index){
        
    if (index > -1) {
    this.localDiag.splice(index, 1);
    }
        
      }

          addSign(obj:any){
    
            this.localSign.push({'id':obj.id,'name':obj.name})  
            this.clicnicalInformation.reset({         
              'selectedValueSign':''
               })  
            }
        
          removeSign(index){
            
        if (index > -1) {
        this.localSign.splice(index, 1);
        }
            
        
              }

      getInvistigation() {  
        this.param={'hospitalID':localStorage.getItem('hospitalID'),'prescriptionID':this.patInfo.prescriptionID};        
       
        this.radNameData =[];

        this.userLoader = true;
       
       
         this.uService.getInvistigation(this.param).subscribe
       
       
         ((response:any)=> {    
          if(response.status === 0 )
          {
          this.radData = response.radiologyTypes;
          this.IndoorDiagData =response.IndoorDiagnosis;

            response.test.forEach(v => {
                if(v.testType==1){
                this.pathData.push(v);
  
                }
                if(v.testType==2){
                 if(this.selectedOptionRad)
                    if(v.radiologyType==this.selectedOptionRad.id)  
                    {                                  
                  this.radNameData.push(v);
                    }
                  }
            });
            this.userLoader = false;
           } else {
             this.userLoader = false;
             alert('Something went wrong try again');
           }
         },
         (error) => {}
       );
      }

      addPath(obj:any){
      this.localPath.push({"id":obj.testID,"name":obj.testName,'testType':obj.testType,obj})  
      this.clicnicalInformation.reset({         
          'selectedValuePath':''
           })  
        }
    
      removePath(index){
        
    if (index > -1) {
    this.localPath.splice(index, 1);
    }       
    
          }


          addRad(obj:any) {
            this.getInvistigation();
          
              }

              addRadName(obj: any) {
                
                this.localPath.push({"id":obj.testID,"name":obj.testName,'testType':obj.testType,obj})  
                this.clicnicalInformation.reset({         
                    'selectedValueRad':'',
                    'selectedValueRadName':''
                     })  
                  }

                  removeTest(index){
        
                    if (index > -1) {
                    this.localPath.splice(index, 1);
                    }       
                    
                          }
                          addIndoorDiag(obj: any) {
                            debugger
                            this.localIndoorData.push({"id":obj.id,"name":obj.name})  
                            this.clicnicalInformation.reset({         
                                'selectedValueIndoorDiag':''
                                 })  
                              }
                              removeIndoorDiag(index){
        
                                if (index > -1) {
                                this.localIndoorData.splice(index, 1);
                                }  
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

  

 
}