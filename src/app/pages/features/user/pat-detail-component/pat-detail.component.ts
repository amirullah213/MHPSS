import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DateFormatPipe } from 'src/app/core/pipes/datepipe.pipe';

@Component({
  selector: 'ncri-create-user',
  templateUrl: './pat-detail.component.html',
  styleUrls: ['./pat-detail.component.scss'],
  providers:[DateFormatPipe]
})
export class PatDetailComponent implements OnInit {

  tab: string = 'biofh'
  phArray = [
    'Abortion',
    'Allegory',
    'Astama',
    'Diabetes Mellitus',
    'Drug Allergy',
    'Hypertension',
    'Ischemic Heart Diseases',
    'IUD',
    'Mis Carriage',
    'Still Birth',
    'Twins',
  ];
  fhArray = [
    'Astama',
    'Diabetes Mellitus',
    'Drug Allergy',
    'Hypertension',
    'Ischemic Heart Diseases',
  ];

  employeeInformation: FormGroup;
  clinicalInformation: FormGroup;
  investigationInformation: FormGroup;
  treatmentInformation: FormGroup;
  complaints: FormGroup;

  // pastHistory: FormGroup;
  familyHistory: FormGroup;
  userLoader: boolean = false;
  userList: any[] = [];
  createUserLoader: boolean = false;
  error: boolean = false;
  errorMessage: any = '';
  patInfo: any = {};
  objp: any = {}
  param: any = {};
  selectedUser: any;
  st: void;
  selectedOption: any;
  selectedOptionSymptom: any;
  selectedOptionDiag: any;
  selectedOptionSign: any;
  selectedOptionPath: any;
  selectedOptionRad: any;
  selectedOptionTreat: any;
  selectedOptionRadName: any;
  selectedOptionIndoorDiag: any;
  localSymptoms: any[] = [];
  localDiag: any[] = [];
  localSign: any[] = [];
  localPath: any[] = [];
  detailedTestsArray: any[] = [];
  localTreat: any[] = [];
  localIndoorData: any[] = [];
  selectedValueSign: string;
  name: string;
  selectedValueDiag: string;
  selectedValueRad: string;
  selectedValueRadName: string;
  selectedValueIndoorDiag: string;
  selectedValueTreat: string;
  pathData: any[] = [];
  diagnosisData: any;
  symptomsData: any;
  signsData: any;
  radData: any[];
  IndoorDiagData: any[];
  radNameData: any[] = [];
  DepartmentD: any[] = [];
  treatData: any[] = [];
  vitalsData: any = {};
  strTreat: string;
  depN: string;
  show: boolean = true;
  showRef: boolean=false;
  showPath: boolean = false;
  showRad: boolean = false;
  investigationForm: any;
  treatmentForm: any;
  patientID: any;
  ptID: any;
  fullName: any;
  prescriptionData: any;
  prString: any;
  jsonArray: { ind: number, name: string; matched: any; }[];
  controls: FormControl[];
  frString: any;
  fhc: FormControl[];
  symptomComplatins: any;
  getSignData: any;
  items: FormArray;

  localGen: any;
  cityName: any;
  diagItems: FormArray;
  localDiagData: any=[];
  insTest: boolean=true;
  isRad: boolean=false;
  modalRef: BsModalRef;
  subTests: any=[];
  a: boolean=false;
  sData: any;
  xRayFilms: any=[];
  idTrue: boolean=false;
  docType: any;
  id: any;
  refList: any=[];
  arrylist: any;
  treatmentItems: FormArray;
  reff: any;
  isrefferel: number;
  location: string;
  hospt: any;
  isRefType: number;
  depIndex: any;
  medId: any;
  treatSelectData: any;
  trtRsp: any;
  diagID: any;
  NewlocalSign: any=[];
  signObj: any={};
  NewSymptoms: any=[];
  constructor(
    private fb: FormBuilder,
    private uService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: BsModalService,
   private datepipe:DateFormatPipe

  ) {
    this.controls = this.phArray.map(c => new FormControl(false));
    this.fhc = this.fhArray.map(c => new FormControl(false));


    let jsonArray = [];


    this.clinicalInformation = this.fb.group({
      // orders: new FormArray(controls, minSelectedCheckboxes(1)),
      phArray: new FormArray(this.controls),
      fhArray: new FormArray(this.fhc),
      bps: ['', Validators.required],
      pulse: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      temperature: ['', Validators.required],
      oxygen_saturation: ['', [Validators.required, Validators.minLength(6)]],
      // items: this.fb.array([ this.createSymptom(null)]),  

      items: this.fb.array([]),
      diagItems: this.fb.array([]),
      isFollowUp: ['', Validators.required],
      isMalnutration: [false, Validators.requiredTrue],
      signsF: ['', Validators.requiredTrue],
      signsArr: ['', Validators.requiredTrue],
      diagnosis: ['', Validators.requiredTrue],
      duration: ['', Validators.required],
      durationType: ['', Validators.required],
      name: [''],
      selectedValueDiag: [''],
      selectedValueSign: [''],
      system_access_enabled: [''],
      Diagnosis: [''],
      description:['']

    });
    this.investigationForm = this.fb.group({
      selectedValuePath: [''],
      selectedValueRad: [''],
      selectedValueRadName: [''],
      selectedValueIndoorDiag: [''],
      termination_date: [''],
      chkPath: [false],
      chkRad: [false],
      ref:['']

    });
    this.treatmentForm = this.fb.group({
      treatmentItems: this.fb.array([]),
      selectedValueTreat: [''],
      prescribedQuantity: [''],
      unit: [''],
      type: [''],
      dose: [''],
      prandial: [''],
      remarks: [''],
      Hospital: [''],
      referralNotes: [''],
      Ambulance: [''],
      Department: [''],
      access_type: ['',false],
      fol_up: [''],
      followUpInterval: [''],
      tComments:[''],
      fComments:[''],
      FollowUpExtInt:[''],
      refNotes:[''],
      itemID:[''],
      itemName:['']

    });

  }


  ngOnInit(): void {

    this.patInfo = JSON.parse(localStorage.getItem("patData"));
    this.getclinicalinfo();
    this.getInvistigation();
    this.getTreatment();
    this.getindoorlist()
    // this.treatmentForm.patchValue({
    //   access_type: "0",
    //   itemName: ""
    // })
    
 
    this.getPatPrescrib(this.patInfo);

  }

  viewReport(template: TemplateRef<any>,tData,i) {
    
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg ',tData,i })); 
    this.sData = tData;
    for(let e of this.localPath){
     
      this.subTests=[];
      if( i==this.localPath.indexOf(e))
      {
        if(e.subTests!=undefined){
        this.subTests=e.subTests
        for(let j of this.subTests)
        {
          
          if(j.xrayFilms6){
          this.xRayFilms.push(JSON.parse(j.xrayFilms6))
          }
          else{
            this.xRayFilms =[]
          }
        }
        break;
      
    }else{
      this.subTests.push(e);
      break;
    }
     }
       
    }
  
  }



  createSymptom(obj: any): FormGroup {
    
    if (obj == null) {

      // obj = { name: '', duration: '', durationType: '', ...obj }
      return this.fb.group({        
        name: '',
        duration: '',
        durationType: ''
      });
    } else {
      return this.fb.group({
      
        name: obj.name,
        duration: obj.duration,
        durationType: obj.durationType
      });
    }
    
  }

 
  removeSymptom(i) {
    //this.items.removeAt(i);
    if (i > -1) {
      this.localSymptoms.splice(i, 1);
    }
  }
  


  createTreatment(obj: any): FormGroup {
    
  
    if (obj == null) {

     return this.fb.group({        
        itemName: '',
        prescribedQuantity: '',
        unit: '',
        type: '',
        dose: '',
        prandial: '',
        remarks: '',
        itemID:''
       
      });
     
    } else  {
      
      if(obj.itemName!='')
      {
        this.fb.group({
      
          itemName: obj.itemName,
          unit: obj.unit,
          type: obj.type,          
          itemID:obj.itemID       
        });
      }
      else
      return this.fb.group({
      
        itemName: obj.itemName,
        prescribedQuantity: obj.prescribedQuantity,
        unit: obj.unit,
        type: obj.type,
        dose: obj.dose,
        prandial: obj.prandial,
        remarks: obj.Rremarks,
        itemID:obj.itemID       
      });
    }
  }

 
  removeTreatment(i: number) {
    this.treatmentItems.removeAt(i);
  }
  
  /*  
  onselectGen(event:TypeaheadMatch):void{
    this.addGen(event.item);
  }
  addGen(obj:any){
    this.localGen.push({'id':obj.id,'name':obj.name})             
    this.clinicalInformation.patchValue({         
      'selectedValueGen':'',
       })  
    }
*/

onSelectSign(event: TypeaheadMatch): void {

  this.signObj= event.item;
 // this.addSign(event.item);
 
 }
 
onSelectDiag(event: TypeaheadMatch): void {

this.diagID = event.item.id
 //this.addDiag(event.item.id);

}


  onSelectSymptom(event: TypeaheadMatch): void {
    
    this.selectedOptionSymptom = event.item;
  }

  onSelectPath(event: TypeaheadMatch): void {
    this.addPath(event.item);

  }
  onSelectRad(event: TypeaheadMatch): void {
    
    this.selectedOptionRad=event.item;
    this.addRad(event.item);

  }
  onSelectRadName(event: TypeaheadMatch): void {

    this.addRadName(event.item);

  }

  onSelectIndoorDiag(event: TypeaheadMatch): void {
    this.addIndoorDiag(event.item);

  }
  onSelectTreat(event: TypeaheadMatch): void {
  
  
    this.treatSelectData = event.item.v;
    this.medId=event.item.v.itemID
    this.setUT(event.item.v);

  }

  setUT(obj: any) {
     
    this.treatmentForm.patchValue({
      unit: obj.unit,
      type: obj.type,
    itemId:obj.itemID

    })

  }
  changeRefVal(e){
    this.arrylist=[]
    this.arrylist = this.refList[e];
  this.docType=this.arrylist.docType;
  this.id = this.arrylist.id
  }

  changeDepVal(e) {
    
   // this.arrylist = this.DepartmentD[e];
   if(e!=undefined){
   this.depIndex=e;
  }else
  {
    this.depIndex=0;
  }
}
  changFollowUpVal(e) {
    if (e.target.value == '1') {
      this.show = false;
    } else {
      this.show = true
    }
  }

  changeCheckboxVal(e) {

    if (e.target.value == '0') {
      this.showRef = false;
    } else {
      this.showRef = true
    }
  }
  changePath(e) {

    if (e.target.checked == false) {
      this.showPath = false;
    } else {
      this.showPath = true
    }
  }
  changeRad(e) {

    if (e.target.checked == false) {
      this.showRad = false;
    } else {
      this.showRad = true
    }
  }


 
  getclinicalinfo() {


    this.param = { 'hospitalID': localStorage.getItem('hospitalID'), 'prescriptionID': this.patInfo.prescriptionID };

    this.userLoader = true;
    this.uService.getclinicalinfo(this.param).subscribe
      ((response: any) => {
        if (response.status === 0) {
          this.prescriptionData = response.prescription;
          this.patientID = response.prescription.patientID;
          this.ptID = response.prescription.ptID;

          this.diagnosisData = response.diagnosis;
          
          this.signsData = response.signs;
          this.symptomsData = response.symptoms;
          this.vitalsData = response.vitals;
          
          if (response.prescription.complaints != '' && response.prescription.complaints!="undefined") {
            this.symptomComplatins = JSON.parse(response.prescription.complaints);
            
            if (this.symptomComplatins !=null && this.symptomComplatins.length != 0) {
              this.symptomComplatins.forEach((e, v) => {
              //  (this.items = this.clinicalInformation.get('items') as FormArray).push(this.createSymptom(e));
                  this.localSymptoms.push(e)
              });
            }
            else {
            //  (this.items = this.clinicalInformation.get('items') as FormArray).push(this.createSymptom(null));

            }
          } else {
          //  (this.items = this.clinicalInformation.get('items') as FormArray).push(this.createSymptom(null));

          }
          
          if (response.prescription.diagnosis != '' && response.prescription.diagnosis!="undefined") {
 
          this.localDiag = JSON.parse(response.prescription.diagnosis);
          
          if(this.localDiag!=undefined && this.localDiag!=null && this.localDiag.length!=0) {
          this.localDiag.forEach((e, v) => {             

          if (this.localDiag.length != 0) {
            
         //   (this.diagItems = this.clinicalInformation.get('diagItems') as FormArray).push(this.createDiag(e));
            this.localDiagData.push({ 'id': e.id, 'name': e.name,  description:e.description})

        }
        else {
         // (this.diagItems = this.clinicalInformation.get('diagItems') as FormArray).push(this.createDiag(null));

        }
      });
    }
    else{
      //  (this.diagItems = this.clinicalInformation.get('diagItems') as FormArray).push(this.createDiag(null));
      } 
    
  }
  else{
//    (this.diagItems = this.clinicalInformation.get('diagItems') as FormArray).push(this.createDiag(null));
  } 
  
    if(response.prescription.signs!=undefined){
          this.getSignData = response.prescription.signs.split(',');
          
          this.getSignData.forEach((e, v) => {
            this.localSign.push({'id':v,'name':e})  

           
          });
        }


          if (this.vitalsData!=undefined && this.vitalsData.length != 0) {
            this.clinicalInformation.patchValue({
              bps: this.vitalsData.bps,
              pulse: this.vitalsData.pulse,
              weight: this.vitalsData.weight,
              height: this.vitalsData.height,
              temperature: this.vitalsData.temperature,
              oxygen_saturation: this.vitalsData.oxygen_saturation,
              isFollowUp: this.prescriptionData.isFollowUp,
              isMalnutration: this.prescriptionData.isMalnutration

            })

            if (this.prescriptionData.pastHistory.length != 0) {
              this.prString = this.prescriptionData.pastHistory.split(',');


              this.matchFunc(this.phArray, this.controls, this.prString);

            }
            if (this.prescriptionData.familyHistory.length != 0) {
              this.frString = this.prescriptionData.familyHistory.split(',');

              this.matchFunc(this.fhArray, this.fhc, this.frString);

            }
          }


          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }


  matchFunc(arr, controls, gstr) {
    this.jsonArray = arr.map((i, v) => {
      return { 'ind': v, 'name': i, 'matched': gstr.includes(i) };
    })
    this.jsonArray.forEach(v => {
      if (v.matched == true) {
        controls[v.ind].setValue(true)
      }
    })
  }
  addSymptom() {
    // this.items = this.clinicalInformation.get('items') as FormArray;
    // this.items.push(this.createSymptom(null));
    debugger
    var tempsymp = 0;
    if(this.localSymptoms.length!=0){
      for(let e of this.localSymptoms)
        { 
          if(this.selectedOptionSymptom==undefined)
 {
  if(e.name==this.clinicalInformation.value.name){
    alert("already Exists");
    tempsymp = 1;
    break
   }
 }
        if(this.selectedOptionSymptom!=undefined && e.name==this.selectedOptionSymptom.name){
        alert("already Exists");
        this.selectedOptionSymptom={};
        tempsymp = 1;
        break
       }
    }
    if (tempsymp == 0)
    {
      
      this.NewSymptoms.push({ name: this.clinicalInformation.value.name,
        })  
         this.localSymptoms.push({ name: this.clinicalInformation.value.name,
          duration: this.clinicalInformation.value.duration,
          durationType: this.clinicalInformation.value.durationType})    }
  }else{
    this.localSymptoms.push({ name: this.clinicalInformation.value.name,
      duration: this.clinicalInformation.value.duration,
      durationType: this.clinicalInformation.value.durationType})  }
      this.clinicalInformation.patchValue({
        name:"",
        durationType:"",
        duration:""
      })
    
  }

  createDiag(obj: any): FormGroup {
    
    if (obj == null) {
       return this.fb.group({
        id: '',
        name: '',
       description:''
      });
    } else {
      return this.fb.group({
        id: obj.id,
        name: obj.name,
        description:obj.description
      
      });
    }
  }
insertToDiag(obj: any)
{
  
  this.localDiagData.push({ 'id': obj.id, 'name': obj.name,  description:obj.description
})

}
  addDiag() {
debugger
    // this.diagItems = this.clinicalInformation.get('diagItems') as FormArray;
    // this.diagItems.push(this.createDiag(null));
var tempdiag = 0;
    if(this.localDiagData.length!=0){
      for(let e of this.localDiagData)
        {  
        if(this.diagID!=undefined && e.id==this.diagID){
        alert("Diagnosis already Exists");
        tempdiag = 1;
        break
       }
       if(this.diagID==undefined)
       {
        if(e.name==this.clinicalInformation.value.name){
          alert("already Exists");
          tempdiag = 1;
          break
        }
       }
    }
    if (tempdiag == 0)
    {
      this.localDiagData.push({ 'id': this.diagID, 'name': this.clinicalInformation.value.name,  description:this.clinicalInformation.value.description})
   
    }
  }else{
    this.localDiagData.push({ 'id': this.diagID, 'name': this.clinicalInformation.value.name,  description:this.clinicalInformation.value.description})
  }
    this.clinicalInformation.patchValue({
      'name': ''
    })
    this.diagID=undefined
  
  }

  removeDiag(i: number) {   
    
    if (i > -1) {
      this.localDiagData.splice(i, 1);
    }
   // this.diagItems.removeAt(i);
  }
  addSign() {
    
    var tempsign = 0;
    if(this.localSign.length!=0){
      for(let e of this.localSign)
        { 
          if(this.signObj.id==undefined || this.signObj=={})
 {
  if(e.name==this.clinicalInformation.value.selectedValueSign){
    alert("already Exists");
    tempsign = 1;
    break
   }
 }
        if((this.signObj.id!=undefined && this.signObj!={}) && e.name==this.clinicalInformation.value.selectedValueSign){
        alert("already Exists");
        tempsign = 1;
        break
       }
    }
    if (tempsign == 0)
    {
      debugger
      this.NewlocalSign.push({'name':this.clinicalInformation.value.selectedValueSign})
      this.localSign.push({ 'id': "", 'name':this.clinicalInformation.value.selectedValueSign})
      this.clinicalInformation.patchValue({
        'selectedValueSign': '',
      })       
       this.signObj={}

     }
  }else{
    this.localSign.push({ 'id': this.signObj.id, 'name': this.signObj.name })
      this.signObj={}
    this.clinicalInformation.patchValue({
      'selectedValueSign': '',   

    })
  }    
    
  }
  removeSign(index) {

    if (index > -1) {
      this.localSign.splice(index, 1);
    }

  }

  


  addClinicalInfo() {
    this.userLoader = true;

    if (this.patInfo.lname != undefined) {
      this.fullName = this.patInfo.firstname + " " + this.patInfo.lname
    } else {
      this.fullName = this.patInfo.firstname
    }

    const tags = this.localSign;
    var result = tags.map(a => a.name);

    const phNames = this.clinicalInformation.value.phArray
      .map((v, i) => v ? this.phArray[i] : null)
      .filter(v => v !== null).toString();
    const fhNames = this.clinicalInformation.value.fhArray
      .map((v, i) => v ? this.fhArray[i] : null)
      .filter(v => v !== null).toString();
    
    this.param =
    {
      'hospitalID': localStorage.getItem('hospitalID'),
      'prescriptionID': this.patInfo.prescriptionID, "userID": localStorage.getItem('docId'),
      "patientID": this.patientID, "ptID": this.ptID, "bps": this.clinicalInformation.value.bps,
      "oxygen_saturation": this.clinicalInformation.value.oxygen_saturation, "pulse": this.clinicalInformation.value.pulse,
      "height": this.clinicalInformation.value.height, "weight": this.clinicalInformation.value.weight,
      "pastHistory": phNames, "familyHistory": fhNames, "isFollowUp": this.clinicalInformation.value.isFollowUp, "lmp": "lmp", "isShortHeight": 0, "isMUAC": 0,
      "signs": result, "PNCServices": "", "temperature": this.clinicalInformation.value.temperature,
      "isLowWeight": 1, "isMalnutration": this.clinicalInformation.value.isMalnutration, "ANCServices": "",
      "edd": "", "complaints": this.localSymptoms, "diagnosis": this.localDiagData,"newSigns":this.NewlocalSign,"newComplaints":this.NewSymptoms, "deptType": 1, "userName": this.fullName,

      "PregnancyNutritionStatus": "", "isTTVac": 0, "LactionNutritionStatus": ""
    };
    this.uService.addclinicalinfo(this.param).subscribe((response: any) => {
      if (response.status === 0) {

        this.router.onSameUrlNavigation = 'reload'
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }

  ///////////////////////////Clinical info ends//////////////////////////

  getInvistigation() {
    this.param = { 'hospitalID': localStorage.getItem('hospitalID'), 'prescriptionID': this.patInfo.prescriptionID };

    this.radNameData = [];
    this.userLoader = true;
    this.uService.getInvistigation(this.param).subscribe
        ((response: any) => {
          
        if (response.status === 0) {
          this.radData = response.radiologyTypes;
          if( response.testData.length!=0){
            
          response.testData.forEach((obj, v) => {
            
            if(this.isRad==false && obj.isDirect==1 ){
             
             this.localPath.push(obj)
             //  this.localPath.push({"id":obj.id,"result":"","patientID":this.patientID,"testName":obj.testName,"testID":obj.testID,"testType":obj.testType,"refRange":obj.refRange,"isSupper":obj.isSupper,"subTests":obj.subTests,'isDirect':obj.isDirect})
             }
            
               });
              }
              else{
                
                if(this.isRad==false){
             //   this.localPath.push({"id":-1,"result":"","patientID":this.patientID,"testName":"","testID":"","testType":"","refRange":"","isSupper":0,"subTests":[]})
                }
              }
          this.IndoorDiagData = response.IndoorDiagnosis;
          response.test.forEach(v => {
            if (v.testType == 1) {              
              this.pathData.push(v);
            }
           if (v.testType == 2) {
             if (this.selectedOptionRad)
                if (v.radiologyType == this.selectedOptionRad.id) {                  
                  this.radNameData.push(v);
                }
            }
            this.isRad =false;
          });

          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }
  addinvestigation() {    
    this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.ptID,'prescriptionID': this.patInfo.prescriptionID,"patientID": this.patientID,"isHB":0,"investigations":this.localPath}
     this.userLoader = true;
    this.uService.addinvestigation(this.param).subscribe
      ((response: any) => {
        if (response.status === 0) {
          this.radData = response.radiologyTypes;   
          this.router.navigate(['doctor/user/'])
        
          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }
  
  addPath(obj: any) {
    
   this.matchTests(obj)
   if(this.insTest==true){
     this.localPath.push(obj)
     this.a=false
    this.investigationForm.patchValue({
      'selectedValuePath': ''
    })

  }else{
    this.insTest=true;
    
    alert("Test Already Added");
    this.investigationForm.patchValue({
      'selectedValuePath': ''
    })
    return false;
  }
  
  }

  removePath(index) {

    if (index > -1) {
      this.localPath.splice(index, 1);
      
    }

  }


  addRad(obj: any) {
   this.isRad =true;
    this.getInvistigation();

  }

  addRadName(obj: any) {

   // this.localPath.push({ "id": obj.testID, "name": obj.testName, 'testType': obj.testType, obj })
   this.addPath(obj)

    this.investigationForm.patchValue({
     // 'selectedValueRad': '',
      'selectedValueRadName': ''
    })
  }

  removeTest(index,id) {

    if (index > -1) {
      this.localPath.splice(index, 1);
      if(id!=undefined)
      this.deleteRadPath(id);

    }

  }

  matchTests(obj:any){  
    
    if(this.localPath.length!=0 ){
    
      for(let e of this.localPath){ 
        if(this.a==true)
        break;
        this.a=false;
        if(e.testID==obj.testID) 
      if(e.isSupper==0 && (e.result=="" || e.result==undefined)){
          this.insTest= false;
          break;
   } else if(e.isSupper==1 ){
    for(let st of e.subTests){
     if(st.result==undefined || st.result=="")
     {
      this.insTest= false;
      this.a=true;
      break ;
     }else{
      this.insTest= true;
     }
    
   }
  }
   else{
      this.insTest= true;
   }
   };
  }
  else{
    this.insTest= true;
  
  }
  }
  
  addIndoorDiag(obj: any) {
    
    var temp = 0;
    if(this.localIndoorData.length!=0){
      for(let e of this.localIndoorData)
        {  
        if(e.id==obj.id){
        alert("Diagnosis already Exists");
        temp = 1;
        break
       }
    }
    if (temp == 0)
    {
      this.localIndoorData.push({ "id": obj.id, "name": obj.name }) 
    }
  }else{
    this.localIndoorData.push({ "id": obj.id, "name": obj.name }) 
  }
    this.investigationForm.patchValue({
      'selectedValueIndoorDiag': ''
    })
  }
  removeIndoorDiag(index) {

    if (index > -1) {
      this.localIndoorData.splice(index, 1);
    }
  }


  getTreatment() {

    this.param = { 'hospitalID': localStorage.getItem('hospitalID'), 'prescriptionID': this.patInfo.prescriptionID };

    this.userLoader = true;

    this.uService.gettreatmentdata(this.param).subscribe

      ((response: any) => {
        if (response.status === 0) {

          response.doctors.forEach(v => {
            this.depN = v.fName + " " + v.lName;
            this.DepartmentD.push(v)
          });
          
          if(response.medicinesData.length!=0)
             response.medicinesData.forEach(v => {
              this.localTreat.push(v)            
          });
          
         if(response.prescription!=undefined && response.prescription.length!=0)
         {  
           
          this.trtRsp = response.prescription;
          if(this.trtRsp.length!=0){
            this.treatmentForm.patchValue({
              tComments: this.trtRsp.TreatmentComments,
              fComments: this.trtRsp.followUpComments,
              followUpInterval: this.trtRsp.followUpInerval,
              FollowUpExtInt: this.trtRsp.location,
              Department: this.trtRsp.Department,
              fol_up:this.trtRsp.follow_up  
             
            }) 
            if(this.trtRsp.isReferral!=undefined){
              this.treatmentForm.patchValue({
              access_type: this.trtRsp.isReferral.toString()
              })
            }
            else{
              this.treatmentForm.patchValue({
                access_type: "0"
                })
            }
          }
         
          
        if(this.treatmentForm.value.access_type=="1")
          { 
            this.showRef=true
          }else{
          this.showRef=false
 }
 }

          
          response.medicines.forEach(v => {
            this.strTreat = v.itemName + ", " + v.unit + " " + v.type;
            this.treatData.push({ "itemName": this.strTreat, v })
          });
          
         

          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }




  addtreatmentinfo() {

    if(this.treatmentForm.value.access_type=="0")
    {
      this.reff=""
      this.location=""
      this.isrefferel=0
    }
    else 
    {
      this.reff=this.treatmentForm.value.Department
      this.location=this.treatmentForm.value.FollowUpExtInt
      this.isrefferel=1
    }
   
        
    this.param = { 'hospitalID': localStorage.getItem('hospitalID'), 'prescriptionID': this.patInfo.prescriptionID,"patientID":this.patInfo.patientID,
 "isReferral":this.isrefferel,"isImplant":0,"medicines":this.localTreat,"isDMPA":0,"isTubalLigation":0,
 "follow_up":this.treatmentForm.value.fol_up,"isFamilyPlanning":0,"isCOC":0,"isCounselling":0,
 "otherTreatmentProcedure":this.treatmentForm.value.tComments,"otherMethod":"","contraceptiveMethod":"",
 "TreatmentComments":this.treatmentForm.value.tComments,"isPPIUCD":0,"isCuT":0,"isCondom":0,
 "isVasectomy":0,"isNET":0, "refferel":this.reff,"isPPImplant":0,"followUpComments":this.treatmentForm.value.fComments,
 "nextVisitDate":"","followUpInerval":this.treatmentForm.value.followUpInterval,"location":this.location,"isPOP":0,
 "treatmentProcedure":""}
    this.userLoader = true;

    this.uService.addtreatmentinfo(this.param).subscribe

      ((response: any) => {
        if (response.status === 0) {
          
          this.updatepatienttoken()

          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }
  updatepatienttoken() {
    
    this.param={"isPrescribed":1,"deptType":"","ptID":this.ptID,"hospitalID":localStorage.getItem('hospitalID')}
    this.userLoader = true;

    this.uService.updatepatienttoken(this.param).subscribe

      ((response: any) => {
        if (response.status === 0) {

          this.router.navigate(['doctor/user/'])
          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => {  }
      )
  }
  reffer() {

    if(this.show==false)
    {
     this.hospt = this.treatmentForm.value.Hospital
     this.isRefType =1;
    }
    else{
        this.hospt =""
        this.isRefType =0;
    }
    this.param={"referralType":this.isRefType,"convinceType":this.treatmentForm.value.Ambulance,"ptID":this.ptID,
    "referralHospital":this.hospt,"refferedTo":this.depIndex,"remarks":this.treatmentForm.value.refNotes,"refferedFrom":localStorage.getItem("docId"),"hospitalID":localStorage.getItem('hospitalID')}

    this.uService.reffer(this.param).subscribe

      ((response: any) => {
        if (response.status === 0) {
          this.router.navigate(['doctor/user/'])
          // this.treatmentForm.patchValue({
          //   Ambulance:"",
          //   refNotes:"",
          //   Hospital:"",
        
          // })         
          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => {  }
      )
}
  deleteRadPath(id:any) {

    this.param = { 'id':id };

    this.userLoader = true;

    this.uService.deleteprescriptiontest(this.param).subscribe

      ((response: any) => {
        if (response.status === 0) {

        this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }

  addTreat() {
    let tVal =this.treatmentForm.value;
    let medic= tVal.itemName.split(",");

    // this.treatmentItems = this.treatmentForm.get('treatmentItems') as FormArray;
    // this.treatmentItems.push(this.createTreatment(null));
    // console.log("form", this.treatmentItems.value)
    debugger
    var temptreat = 0;
    if(this.localTreat.length!=0){
      for(let e of this.localTreat)
        { 
          
        if(e.medicine==medic[0] && e.unit==tVal.unit && e.type==tVal.type){
        alert("already Exists");
        temptreat= 1;
        this.treatmentForm.patchValue({
          "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "quantity": ""
      
         })
        break
       }
    }
    if (temptreat == 0)
    {
      
   this.localTreat.push({"prandial":tVal.prandial,"unit":tVal.unit,"type":tVal.type, "remarks":tVal.remarks,"dose":tVal.dose,"medicine":medic[0],"medicineID":this.medId,"prescribedQuantity":tVal.prescribedQuantity,"issuedQuantity":"","duration":""})
   this.treatmentForm.patchValue({
    "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "quantity": ""

   })
         }
  }else{
    let medic= tVal.itemName.split(",");
    this.localTreat.push({"prandial":tVal.prandial,"unit":tVal.unit,"type":tVal.type, "remarks":tVal.remarks,"dose":tVal.dose,"medicine":medic[0],"medicineID":this.medId,"prescribedQuantity":tVal.prescribedQuantity,"issuedQuantity":"","duration":""})
    this.treatmentForm.patchValue({
     "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "quantity": ""
 
    })
  }

  }
  removeTreat(index) {

    if (index > -1) {
      this.localTreat.splice(index, 1);
    }
  }


  get f() {
    return this.clinicalInformation.controls;
  }
  get invf() {
    return this.investigationForm.controls;
  }

  get trtf() {
    return this.treatmentForm.controls;
  }


  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }

  //patient prescription list
  getPatPrescrib(obj: any) {

    this.param = { 'patientID': obj.patientID, 'hospitalID': obj.hospitalID };
    this.userLoader = true;
    this.uService.getPatPrescription(this.param).subscribe
      ((response: any) => {
        if (response.status === 0) {
          console.log(response);
          this.userList = response.data;
          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }

  getindoorlist()
   {
     this.param={"hospitalID": localStorage.getItem('hospitalID')}
     this.uService.getindoorlist(this.param).subscribe
     ((response: any) => {
       if (response.status === 0) {
                 
         
       this.refList = response.data;

         this.userLoader = false;
       } else {
         this.userLoader = false;
         alert('Something went wrong try again');
       }
     },
       (error) => { }
     );
    
    }
   
  generatetoken(){
    
    this.userLoader=true
    if(this.localIndoorData.length!=0 && this.localIndoorData!=undefined && this.docType!=undefined && this.id!=undefined){
  if(this.investigationForm.value.termination_date!=undefined && this.investigationForm.value.termination_date!='')
{     
  let operateDate = this.datepipe.transform(new Date(this.investigationForm.value.termination_date))//formatting current ///date here 
  this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.ptID,'prescriptionID': this.patInfo.prescriptionID,"patientID": this.patientID,"departmentID":this.id,"diagnosis":this.localIndoorData,"isIndoor":this.docType,"refferedFrom":-1,"admitDate":operateDate}
}else{  
     this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.ptID,'prescriptionID': this.patInfo.prescriptionID,"patientID": this.patientID,"departmentID":this.patInfo.departmentID,"diagnosis":this.localIndoorData,"isIndoor":3,"refferedFrom":-1}

}
  this.uService.generatetoken(this.param).subscribe
    ((response: any) => {
      if (response.status === 0) {
        console.log(response);
        this.investigationForm.patchValue({
          ref: '',
          termination_date: ""
        })
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
   
  }
}
  // patient prescription list
  gotoPresDetails(udata) {
    localStorage.setItem('uPresData', JSON.stringify(udata));
    this.router.navigate(['doctor/user/print-presc'])
  }


  getTwentyFourHourTime(amPmString) {
    var d = new Date("1/1/2013 " + amPmString);
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }





}
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };
  return validator;

}