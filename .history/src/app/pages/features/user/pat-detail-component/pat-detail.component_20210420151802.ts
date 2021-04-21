import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DateFormatPipe } from 'src/app/core/pipes/datepipe.pipe';
import { PrintService } from 'ng-thermal-print';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { APP_CONFIG } from 'src/app/core';
import { contains } from 'jquery';
import { formatDate } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'ncri-create-user',
  templateUrl: './pat-detail.component.html',
  styleUrls: ['./pat-detail.component.scss'],
  providers:[DateFormatPipe]
})
export class PatDetailComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
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
    'Others'
  ];
  fhArray = [
    'Astama',
    'Diabetes Mellitus',
    'Drug Allergy',
    'Hypertension',
    'Ischemic Heart Diseases',
    'Others'

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
  modalRef1: BsModalRef;
  subTests: any=[];
  a: boolean=false;
  sData: any;
  xRayFilms: any;
  idTrue: boolean=false;
  docType: any=undefined;
  id: any=undefined;
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
  testNameF: any;
  resultF: any;
  refRangeF: any;
  showFh: boolean=false;
  showPh: boolean=false;
  detial: any;
  detail: any;
  docInfo: any;
  sympId: any;
  deptType: any;
  imagesArr: any;
  errormsg: any;
  Indid: any;
  imageInModal: any;
  imageUrl: any;
  eddDate: any;
  lmpDate: any;
  ANCServices: any;
  location1: any;
  newLocalPath: any=[];
  showds: boolean;
  prescriptionID:any;
  descriptionAD:boolean=false;
  objPath:any={};
  model3: any={};
  testsArr: any = [];
  modal24: any = {};
  loaderUpdate: boolean;
  
  constructor(
    private fb: FormBuilder,
    private uService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: BsModalService,
   private datepipe:DateFormatPipe,
   private sanitizer:DomSanitizer


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
      pname: [''],
      selectedValueDiag: [''],
      selectedValueSign: [''],
      system_access_enabled: [''],
      Diagnosis: [''],
      description:[''],
      otherFh:[''],
      otherPh:[''],
      isTTVac:[''],
      durPrg:[''],
      durLac:[''],
      ANCServices:[''],
      PNCServices:[''],
      LMP:[''],
      EDD:[''],
      isShortHeight:[''],
      isLowWeight:[''],
      isMUAC:[''],
      pregnancyStatus:[''],
      txtDisabilities:[''],
      chkDisabilities:['']
    });
    this.investigationForm = this.fb.group({
      selectedValuePath: [''],
      selectedValueRad: [''],
      selectedValueRadName: [''],
      selectedValueIndoorDiag: [''],
      termination_date: [''],
      chkPath: [false],
      chkRad: [false],
      ref:[''],
      descriptionIndoor:['']

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
    this.imageUrl=APP_CONFIG.apiBaseUrl+'getImage/';
    if(localStorage.getItem("patData"))
    this.patInfo = JSON.parse(localStorage.getItem("patData"));
    if(localStorage.getItem("docDetails"))
    this.docInfo = JSON.parse(localStorage.getItem("docDetails"));
    if(localStorage.getItem("details"))
    this.detail = JSON.parse(localStorage.getItem("details"));
    console.log('dept name====',this.detail.fname)
    this.treatmentForm.patchValue({
      Ambulance:0,
      prandial:"After Meal",
      dose:"SOS",
      followUpInterval:'Week(s)'
    }) 
    this.clinicalInformation.patchValue({
      isTTVac:"0",
      isFollowUp:"0",
      isLowWeight:"0",
      isShortHeight:'0',
      durationType:"Day(s)"
    })
    this.getclinicalinfo();
    this.getInvistigation();
    this.getTreatment();
    this.getindoorlist()   

    if(localStorage.getItem("tab"))
    this.setTab(localStorage.getItem("tab"))
   

    // this.treatmentForm.patchValue({
    //   access_type: "0",
    //   itemName: ""
    // })
    
 
    this.getPatPrescrib(this.patInfo);

  }
  // getlink():SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustUrl("C:/path/to/executable");
  // }
  gettestImages(presID) {
    this.imagesArr=[];
    if(presID!=undefined){
    this.userLoader= true;
    this.param={prescriptiontest_id:presID};

    
    this.uService.gettestImages(this.param).subscribe

    ((response: any) => {
      if (response.status === 0) {
        
        this.imagesArr=response.data;

//       this.getlink()

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
  showImageModal(template1: TemplateRef<any>,img) {
    this.imageInModal=img;
    console.log('this.imageInModal',this.imageInModal);
    this.modalRef1 = this.modalService.show(
      template1,
      Object.assign({}, {id: 2, class: 'gray modal-lg' })
    );
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }
  viewReport(template: TemplateRef<any>,tData,i) {
   debugger
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg ',tData,i })); 
    this.sData = tData;
    this.gettestImages(this.sData.id);
    for(let e of this.localPath){
     
      this.subTests=[];
       if( i==this.localPath.indexOf(e))
       {
    if(this.sData.testType==1){
        if(e.isSupper==1 ){
        this.subTests=e.subTests
        break;
      
    }else{
      this.subTests.push(e);
      break;
    }
  }
  else{
    // for radialogy
    
    
    this.testNameF = e.testName;
    this.resultF=e.result;
    this.refRangeF =e.refRange
    if(e.xrayFilms6 && e.xrayFilms6!=0){
     this.xRayFilms=e.xrayFilms6;
    }else
    {
      this.xRayFilms=""
    }
        
      
      }
  
     }
       
    }
  
  }

  editReport(templateECG: TemplateRef<any>,tData,i) {
    debugger
     this.modalRef = this.modalService.show(templateECG,Object.assign({}, { class: 'gray modal-lg ',tData,i })); 
     this.sData = tData;
     this.gettestImages(this.sData.id);
     for(let e of this.localPath){
      
       this.subTests=[];
        if( i==this.localPath.indexOf(e))
        {
     if(this.sData.testType==1){
         if(e.isSupper==1 ){
         this.subTests=e.subTests
         break;
       
     }else{
       this.subTests.push(e);
       break;
     }
   }
   else{
     // for radialogy
     
     
     this.testNameF = e.testName;
     this.resultF=e.result;
     this.refRangeF =e.refRange
     if(e.xrayFilms6 && e.xrayFilms6!=0){
      this.xRayFilms=e.xrayFilms6;
     }else
     {
       this.xRayFilms=""
     }
         
       
       }
   
      }
        
     }
   
   }

 
  removeSymptom(i) {
    //this.items.removeAt(i);
    if (i > -1) {
      this.localSymptoms.splice(i, 1);
    }
  }
  
  removeTreatment(i: number) {
    this.treatmentItems.removeAt(i);
  }
  
  
onSelectSign(event: TypeaheadMatch): void {

  
  this.signObj= event.item;
 // this.addSign(event.item);
 
 }
 
 onSelectDisabilities(evn){
   if(evn==true)
   {
  this.showds=true
   }
   else{
    this.showds=false
   }
   
 }
onSelectDiag(event: TypeaheadMatch): void {
  debugger
  this.descriptionAD=false;
    if(this.clinicalInformation.value.pname=="Others" && this.clinicalInformation.value.description==""){
     this.descriptionAD=true;
    }

this.diagID = event.item.id

}

enableDesc(){
  debugger
  if(this.clinicalInformation.value.pname=="Others" && this.clinicalInformation.value.description!=""){
    this.descriptionAD=false;
   }
}
  onSelectSymptom(event: TypeaheadMatch): void {
    
    this.selectedOptionSymptom = event.item;
    this.sympId = event.item.id;
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
   // this.addIndoorDiag(event.item);
   
    this.Indid = event.item.id
    

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
  onSelectPastH(e,chk){
    
    if(e=="Others"){
    if( chk==true)
    {
      this.showPh =true;
    }  
    else{
      this.showPh=false
    }
  }
}
  onSelectFamilyh(e,chk){
    
    if(e=="Others" && chk==true)
    {
      this.showFh =true;
    }  
    else{
      this.showFh=false
    }
  }
  
  changeRefVal(e){
     
     
     if(e!="Choose Referral"){
       debugger
    this.arrylist=[]
    this.arrylist = this.refList
   
      
      if(e){
      this.docType=1;
      this.id = e
      }
      else
      {
        this.docType=undefined;
        this.id = undefined
      }
    }
  }

  changeDepVal(e) {
      
    let vra = e.replace(/\s/g, "");
    this.arrylist=[]
    this.arrylist = this.DepartmentD
  for(let ele of this.arrylist ){
    //  let fulName = ele.fname + " " + ele.lname;
    let out = ele.NAME.replace(/\s/g, "");
      if(out === vra){
        this.depIndex=ele.id;
        break;
      }else{
        this.depIndex=0
      }
    };  
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
    
    this.diagnosisData=[];
    this.signsData=[];
    this.symptomsData = []
    this.vitalsData =[];
    this.localDiag=[];
    this.localSign=[];
    this.prescriptionData=[];
    this.symptomComplatins=[];
    this.localSymptoms=[];
    this.localDiagData=[];

    this.param = { 'hospitalID': localStorage.getItem('hospitalID'), 'prescriptionID': this.patInfo.prescriptionID };
    
    this.userLoader = true;
    this.uService.getclinicalinfo(this.param).subscribe
      ((response: any) => {
        if (response.status === 0) {
          console.log('test response==========',response)
          this.prescriptionData = response.prescription;
          this.putValue(this.prescriptionData)
          this.patientID = response.prescription.patientID;
          // this.prescriptionID = response.prescription.prescriptionID;
          debugger
          this.ptID = response.prescription.ptID;
          this.diagnosisData = response.diagnosis;          
          this.signsData = response.signs;          
          this.symptomsData = response.symptoms;
          this.vitalsData = response.vitals;

          if (response.prescription.complaints != '' && response.prescription.complaints!="undefined") {
            this.symptomComplatins = JSON.parse(response.prescription.complaints);
            
            if (this.symptomComplatins !=null && this.symptomComplatins.length != 0) {
              this.symptomComplatins.forEach((e, v) => {
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
            this.localDiagData.push({ 'id': e.id, 'name': e.name,  "description":e.description})

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
            if(e!="")
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

               })

            if (this.prescriptionData.pastHistory != null && this.prescriptionData.pastHistory.length != 0) {
              this.prString = this.prescriptionData.pastHistory.split(',');
              this.matchFunc(this.phArray, this.controls, this.prString);
              
              
             
            }
            if (this.prescriptionData.familyHistory != null && this.prescriptionData.familyHistory.length != 0) {
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
  putValue(pd: any) {
    
    let disabilities =""
    if(pd.disabilities!="" && pd.disabilities!=undefined && pd.disabilities!=null)
    {
      
    disabilities=pd.disabilities
    this.showds=true;
    }
    else{
      disabilities=""
      this.showds=false;
    }
    if(pd.lmp!=null && pd.lmp!="0000-00-00 00:00:00" && pd.lmp!="1969-12-31T19:00:00.000Z"){


      this.lmpDate = formatDate(pd.lmp, "y-M-d", "en-PK")
            this.eddDate = formatDate(pd.edd, "y-M-d", "en-PK");

    }
    if(pd.ANCServices=="null" || pd.ANCServices==undefined || pd.ANCServices==""){
      this.ANCServices = ""
    }
    else{
      this.ANCServices= pd.ANCServices
    }
    this.clinicalInformation.patchValue({      
      isFollowUp: pd.isFollowUp,
      isMalnutration: pd.isMalnutration,
      ANCServices: this.ANCServices,
      PNCServices:pd.PNCServices,
      isTTVac:pd.isTTVac,
      durPrg:pd.PregnancyNutritionStatus,
      durLac:pd.LactionNutritionStatus,
      LMP:this.lmpDate,
      EDD:this.eddDate,
      isMUAC:pd.isMUAC,
      isShortHeight:pd.isShortHeight,
      isLowWeight:pd.isLowWeight,
      pregnancyStatus:pd.pregnancyStatus,
      txtDisabilities:disabilities,
      chkDisabilities:this.showds
    })

  }

  
  matchFunc(arr, controls, gstr) {
    
    this.jsonArray = arr.map((i, v) => {
      return { 'ind': v, 'name': i, 'matched': gstr.includes(i) };
    })
    this.jsonArray.forEach(v => {
      if (v.matched == true) {
        controls[v.ind].setValue(true);
        
        if(this.jsonArray.length<11)
        {
          if(v.name=="Others") {
          this.showFh=true
          this.clinicalInformation.patchValue({
            otherFh:this.prescriptionData.otherFamilyHistory
          })
        } 
        else
        {
          this.showFh=false
        }
      }else{
        if(v.name=="Others") {
          this.showPh=true
          this.clinicalInformation.patchValue({
            otherPh:this.prescriptionData.otherPastHistory
          })
        } 
        else
        {
          this.showPh=false
        }
        
      }
        
      }

      
     
    })
  }
  addSymptom() {
    let ci =this.clinicalInformation.value;
    
  if(ci.name!=undefined && ci.name!='')
  {
    let tempsymp = 0;
    
    if(this.localSymptoms.length!=0)
    {
      for(let e of this.localSymptoms)
        { 
       //  if(this.selectedOptionSymptom==undefined)
         //  {
            if(e.name==ci.name){
            alert("already Exists");
            tempsymp = 1;
            break
                   }
                    // }
        if(this.selectedOptionSymptom!=undefined && e.name==this.selectedOptionSymptom.name){
        alert("already Exists");
        this.selectedOptionSymptom=undefined;
        this.sympId=undefined
        tempsymp = 1;
        break
       }
          }
          if (tempsymp == 0)
          {
         this.localSymptoms.push({sympId:this.sympId, name: ci.name,
          duration: ci.duration,
          durationType: ci.durationType})  
          }
      }else{
                 this.localSymptoms.push({sympId:this.sympId, name: ci.name,
                 duration: ci.duration,
                 durationType: ci.durationType})  }
                 this.clinicalInformation.patchValue({
                 name:"",
                 durationType:"",
                 duration:""
      })
      this.selectedOptionSymptom=undefined;
      this.sympId=undefined

  }
  }
  
insertToDiag(obj: any)
{

  this.localDiagData.push({ 'id': obj.id, 'name': obj.name,  "description":obj.description
  
})

}
  addDiag() {
    debugger
    let ci = this.clinicalInformation.value;
    
let tempdiag = 0;
if(ci.pname!=undefined && ci.pname!="" && this.diagID!=undefined ){
    if(this.localDiagData.length!=0){
      for(let e of this.localDiagData)
        { 
         
          if((e.id==46 || e.id==47 || e.id==48 || e.id==49) && (this.diagID==46 || this.diagID==47 || this.diagID==48 || this.diagID==49))
          {
            alert("Covid Diagnosis already added");
            tempdiag = 1;
            break
          }
        if(this.diagID!=undefined && e.id==this.diagID){
        alert("Diagnosis already Exists");
        tempdiag = 1;
        break
       }
       if(this.diagID==undefined)
       {
        if(e.name==ci.name){
          alert("already Exists");
          tempdiag = 1;
          break
        }
       }

       
    }
    if (tempdiag == 0 )
    {
      this.localDiagData.push({ 'id': this.diagID, 'name': ci.pname,  description:ci.description})
   
    }
  }else{
    this.localDiagData.push({ 'id': this.diagID, 'name': ci.pname,  description:ci.description})
  }
}
else{
  alert("Please select a diagnosis from the list")
}
    this.clinicalInformation.patchValue({
      'pname': '',
      'description':''
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
    
    let s =this.clinicalInformation.value;
    if(s.selectedValueSign!=undefined && s.selectedValueSign!='')
  {
    let tempsign = 0;
   
    if(this.localSign.length!=0){
      for(let e of this.localSign)
        { 
       //   if(this.signObj.id==undefined || this.signObj=={})
 //{
  if(e.name==s.selectedValueSign){
    alert("already Exists");
    tempsign = 1;
    break
   }
// }

        if((this.signObj.id!=undefined && this.signObj!={}) && e.name==s.selectedValueSign){
        alert("already Exists");
        tempsign = 1;
        break
       }
    }
    if (tempsign == 0)
    {
      //the id will be undefined
      this.localSign.push({ 'id':this.signObj.id , 'name':s.selectedValueSign})
      this.clinicalInformation.patchValue({
        'selectedValueSign': '',
      })       
       this.signObj={}

     }
  }else{
    this.localSign.push({ 'id': this.signObj.id, 'name': s.selectedValueSign })
      this.signObj={}
    this.clinicalInformation.patchValue({
      'selectedValueSign': '',   

    })
  }   
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
  eddCalc(lmp){

    
    if(lmp!='' && lmp!=undefined){
    let d = lmp
    this.lmpDate = formatDate(d, "y-M-d", "en-PK")
d.setMonth(d.getMonth() + 9);
d.setDate((d.getDate()+7));
this.eddDate = d.toLocaleDateString()
this.eddDate = formatDate(this.eddDate, "y-M-d", "en-PK");
this.clinicalInformation.patchValue({
 EDD: this.eddDate
})
  }
  }

  addClinicalInfo() {
    
   
  if(this.clinicalInformation.value.pname=="Others" && this.clinicalInformation.value.description==""){
    alert('Please fill Description for diagnosis');
   }else{

  
    this.userLoader=true;
    this.NewSymptoms=[];
let ci=this.clinicalInformation.value
let tempsymp = 0;

    if(this.localSymptoms.length!=0){
      for(let e of this.localSymptoms)
        { 
          if(this.selectedOptionSymptom==undefined)
 {
  if(e.name==ci.name){
  //  alert("already Exists");
    tempsymp = 1;
    break
   }
 }
        if(this.selectedOptionSymptom!=undefined && e.name==this.selectedOptionSymptom.name){
//        alert("already Exists");
        this.selectedOptionSymptom=undefined;
        tempsymp = 1;
        break
       }
    }
    }
    if(ci.name!=undefined && ci.name!=''  && ci.name!=null){
    if (tempsymp == 0)
    
    {
      if(this.selectedOptionSymptom==undefined){
      this.localSymptoms.push({sympId:this.sympId, name: ci.name, duration: ci.duration,durationType: ci.durationType})
    
  }else{
    this.localSymptoms.push({sympId:this.sympId, name: ci.name,duration: ci.duration,durationType: ci.durationType})
  }
}
    }

for (let symp of this.localSymptoms)
{
  
  if(symp.sympId==undefined )
  {
        this.NewSymptoms.push({"name":symp.name})
  }
}

let tempsign = 0;
    if(this.localSign.length!=0){
      for(const e of this.localSign)
        { 
          if(this.signObj.id==undefined || this.signObj=={})
 {
  if(e.name==ci.selectedValueSign){
 //   alert("already Exists");
    tempsign = 1;
    break
   }
 }

 
        if((this.signObj.id!=undefined && this.signObj!={}) && e.name==this.clinicalInformation.value.selectedValueSign){
        tempsign = 1;
        break
       }
    
  }
}
  if(ci.selectedValueSign!=undefined && ci.selectedValueSign!=''  && ci.selectedValueSign!=null){

    if (tempsign == 0)
    {
      // the id will be undefied
      this.localSign.push({ 'id': this.signObj.id, 'name':ci.selectedValueSign})
           
       this.signObj={}

     
  }else{
    this.localSign.push({ 'id': this.signObj.id, 'name': this.signObj.name })
      this.signObj={}
  
  }

}
for (let sgn of this.localSign)
{
  
  if(sgn.id==undefined)
  {
    this.NewlocalSign.push({'name':sgn.name})
  }
}

  let tempdiag = 0;
    if(this.localDiagData.length!=0){
      for(const e of this.localDiagData)
        {  
        if(this.diagID!=undefined && e.id==this.diagID)
        {
        tempdiag = 1;
        break
       }
       if(this.diagID==undefined)
       {
        if(e.name==ci.pname)
        {
          tempdiag = 1;
          break
        }
      }
    }
    }
    if(ci.pname!=undefined && ci.pname!='' && ci.pname!=null )
    if (tempdiag == 0)
    {
      this.localDiagData.push({ 'id': this.diagID, 'name': ci.pname,  "description":ci.description})
   
    }

    const tags = this.localSign;
    var result = tags.map(a => a.name);

    const phNames = ci.phArray
      .map((v, i) => v ? this.phArray[i] : null)
      .filter(v => v !== null).toString();
    const fhNames = ci.fhArray
      .map((v, i) => v ? this.fhArray[i] : null)
      .filter(v => v !== null).toString();
      
      let disabilitiesVal=""
     if(ci.txtDisabilities!='' && ci.txtDisabilities!=undefined && ci.txtDisabilities!=null && ci.chkDisabilities==true)
     {
       disabilitiesVal =ci.txtDisabilities;
     }
     else 
     {
      disabilitiesVal = ""
     }
     
    this.param =
    {
      'hospitalID': localStorage.getItem('hospitalID'),
      'prescriptionID': this.patInfo.prescriptionID, "userID":this.docInfo.id,
      "patientID": this.patientID, "ptID": this.patInfo.ptID, "bps": ci.bps,"oxygen_saturation": ci.oxygen_saturation, "pulse": ci.pulse,
      "height": ci.height, "weight": ci.weight,"pastHistory": phNames, "familyHistory": fhNames, "isFollowUp": ci.isFollowUp, "lmp": this.lmpDate, "isShortHeight": ci.isShortHeight, "isMUAC": ci.isMUAC,
      "signs": result, "PNCServices":ci.PNCServices, "temperature": ci.temperature,"isLowWeight": ci.isLowWeight, "isMalnutration": ci.isMalnutration, "ANCServices": ci.ANCServices,
      "edd": ci.EDD, "complaints": this.localSymptoms, "diagnosis": this.localDiagData,"newSigns":this.NewlocalSign,"newComplaints":this.NewSymptoms, "deptType": this.deptType, "userName": this.docInfo.name,
      "otherFamilyHistory":ci.otherFh, "otherPastHistory":ci.otherPh,"disabilities":disabilitiesVal,
      "PregnancyNutritionStatus": ci.durPrg, "isTTVac": ci.isTTVac, "LactionNutritionStatus": ci.durLac,"pregnancyStatus":ci.pregnancyStatus
    };
    this.uService.addclinicalinfo(this.param).subscribe((response: any) => {
      if (response.status === 0) {
        this.getclinicalinfo();
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
  ///////////////////////////Clinical info ends//////////////////////////

  getInvistigation() {
    
    this.param = { 'hospitalID': localStorage.getItem('hospitalID'), 'prescriptionID': this.patInfo.prescriptionID };
    this.pathData=[]
    this.radData=[];
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
             }
            
               });
              }
              
          this.IndoorDiagData = response.IndoorDiagnosis;
          response.test.forEach(v => {
            if (v.testType == 1) { 
               if(v.supperTest!=1098 && v.supperTest!=1132)
              {
              this.pathData.push(v);
              }
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
  
  alertFunc(st)
{

  alert(st + " Added Successfuly")
}  
addinvestigation() {   
    if(this.newLocalPath.length>0 ){ 
    this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.patInfo.ptID,'prescriptionID': this.patInfo.prescriptionID,"patientID": this.patientID,"isHB":0,"investigations":this.newLocalPath}
     this.userLoader = true;
    this.uService.addinvestigation(this.param).subscribe
      ((response: any) => {
        if (response.status === 0) {
          this.radData = response.radiologyTypes;   
          localStorage.setItem("tab",'penPats') 
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
else
{
  alert("Please Add Invistigations")

}
}
  
  addPath(obj: any) {
    
   this.matchTests(obj)
   
   if(this.insTest==true){
     this.localPath.push(obj)
     this.newLocalPath.push(obj);
    // this.alertFunc("Test")

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

   this.addPath(obj)

    this.investigationForm.patchValue({
     // 'selectedValueRad': '',
      'selectedValueRadName': ''
    })
  }

  removeTest(index,obj) {
    
    let idsArr=[]
    if(obj.subTests!=undefined && obj.subTests.length>0){
for(let sb of obj.subTests)
    { 
       idsArr.push(sb.id)
    }
    idsArr[obj.subTests.length+1]=obj.id

  }
  else
  {
    idsArr.push(obj.id)
  }
    if (index > -1) {
      this.localPath.splice(index, 1);
      if(idsArr.length>0)
      this.deleteRadPath(idsArr);

    }

  }

  matchTests(obj:any){  
    debugger
    if(this.localPath.length!=0 ){
    
      for(let e of this.localPath){ 
        if(this.a==true && this.insTest==false){
        break;
        }
        this.a=false;        
        if(e.testID==obj.testID) 
      if(e.isSupper==0 && (e.result=="" || e.result==undefined)){
          this.insTest= false;
          break;
   } else if(e.isSupper==1 ){
    for(let st of e.subTests){
     if(st.status==0 || st.status==undefined)
     {
      this.insTest= false;
      this.a=true;
    break
     }else{
      this.insTest= true;
      break
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
  
  addIndoorDiag() {
    debugger
    let inv = this.investigationForm.value;
    var temp = 0;
    if(inv.selectedValueIndoorDiag!=undefined && inv.selectedValueIndoorDiag!="" && this.Indid!=undefined ){
    if(this.localIndoorData.length!=0){
      for(let e of this.localIndoorData)
        {  
          let cv = e.name.split(" ");
          let cp = inv.selectedValueIndoorDiag.split(" ");
         
          debugger 

          if(cv[0]=="Covid" && cp[0]=="Covid")
          {
            alert("Covide is already added");
            temp = 1;
            break
          }
        if(e.id==this.Indid){
          
        alert("Diagnosis already Exists");
        temp = 1;
        break
       }
    }
    if (temp == 0)
    {
      this.localIndoorData.push({ "id": this.Indid, "name": inv.selectedValueIndoorDiag,"description":inv.descriptionIndoor }) 
    }
  }else{
    this.localIndoorData.push({ "id": this.Indid, "name": inv.selectedValueIndoorDiag,"description":inv.descriptionIndoor }) 
  }
}
    this.investigationForm.patchValue({
      'selectedValueIndoorDiag': '',
      'descriptionIndoor':''
    })
    this.Indid=undefined
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
         //   this.depN = v.fName + " " + v.lName;
         this.depN=v.NAME;
         debugger
         if(v.id!=this.detail.id){
          this.DepartmentD.push(v)
         }
           
          });
          
          if(response.medicinesData.length!=0)
             response.medicinesData.forEach(v => {
              this.localTreat.push(v)            
          });
          
         if(response.prescription!=undefined && response.prescription.length!=0)
         {  
          this.trtRsp = response.prescription;

           
           if(this.trtRsp.location!=undefined && this.trtRsp.location!="null" && this.trtRsp.location!='')
           {
            this.location1 =this.trtRsp.location
           }
           else
           {
             this.location1 = "Select Location"
           }
          if(this.trtRsp.length!=0){
            this.treatmentForm.patchValue({
              tComments: this.trtRsp.TreatmentComments,
              fComments: this.trtRsp.followUpComments,
              followUpInterval: this.trtRsp.followUpInerval,
              FollowUpExtInt: this.location1,
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

    let tVal =this.treatmentForm.value;
    let medic= tVal.itemName.split(",");
    var temptreat = 0;
    if(this.localTreat.length!=0){
      for(let e of this.localTreat)
        { 
          
        if(e.medicine==medic[0] && e.unit==tVal.unit && e.type==tVal.type1){
         temptreat= 1;
        this.treatmentForm.patchValue({
          "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "prescribedQuantity": ""
      
         })
        break
       }
    }
  }
  if(tVal.itemName!=undefined && tVal.itemName!='' && tVal.itemName!=null && tVal.unit!=undefined && tVal.unit!='' && tVal.unit!=null){
    if (temptreat == 0)
    {      
   this.localTreat.push({"prandial":tVal.prandial,"unit":tVal.unit,"type":tVal.type, "remarks":tVal.remarks,"dose":tVal.dose,"medicine":medic[0],"medicineID":this.medId,"prescribedQuantity":tVal.prescribedQuantity,"issuedQuantity":"","duration":""})
   this.treatmentForm.patchValue({
    "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "prescribedQuantity": ""

   })
         
    }
  }


    if(tVal.access_type=="0")
    {
      this.reff=""
      this.location=""
      this.isrefferel=0
    }
    else 
    {
      this.reff=tVal.Department
      this.location=tVal.FollowUpExtInt
      this.isrefferel=1
    }
   
        
    this.param = { 'hospitalID': localStorage.getItem('hospitalID'), 'prescriptionID': this.patInfo.prescriptionID,'ptID': this.ptID,"patientID":this.patInfo.patientID,
 "isReferral":this.isrefferel,"isImplant":0,"medicines":this.localTreat,"isDMPA":0,"isTubalLigation":0,
 "follow_up":tVal.fol_up,"isFamilyPlanning":0,"isCOC":0,"isCounselling":0,
 "otherTreatmentProcedure":tVal.tComments,"otherMethod":"","contraceptiveMethod":"",
 "TreatmentComments":tVal.tComments,"isPPIUCD":0,"isCuT":0,"isCondom":0,
 "isVasectomy":0,"isNET":0, "refferel":this.reff,"isPPImplant":0,"followUpComments":tVal.fComments,
 "nextVisitDate":"","followUpInerval":tVal.followUpInterval,"location":this.location,"isPOP":0,
 "treatmentProcedure":""}
    this.userLoader = true;
    
if(this.localDiag!=undefined && this.localDiag!=null && this.localDiag.length!=0){
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
  else{
    
    alert("Please insert and Save Diagnosis first");
    localStorage.setItem('tab','clinicalInfo');
location.reload()
  }
}
  updatepatienttoken() {
    
    this.deptType=0;
    if(this.patInfo.deptType==0)
    {
       this.deptType = 1

    }
    else{
      this.deptType = this.patInfo.deptType

    }



    this.param={"isPrescribed":2,"deptType":this.deptType,"ptID":this.patInfo.ptID,"hospitalID":localStorage.getItem('hospitalID')}
    this.userLoader = true;

    this.uService.updatepatienttoken(this.param).subscribe

      ((response: any) => {
        if (response.status === 0) {

          this.router.navigate(['doctor/user/'])
          localStorage.removeItem("tab")

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
     this.param={"referralType":this.isRefType,"convinceType":this.treatmentForm.value.Ambulance,"ptID":this.patInfo.ptID,
     "referralHospital":this.hospt,"refferedTo":this.depIndex,"remarks":this.treatmentForm.value.refNotes,"refferedFrom":this.patInfo.departmentID,"hospitalID":localStorage.getItem('hospitalID')}
     if(this.localDiag!=undefined && this.localDiag!=null && this.localDiag.length!=0){

     this.uService.reffer(this.param).subscribe
     ((response: any) => {
       if (response.status === 0) {
         this.router.navigate(['doctor/user/'])
         localStorage.removeItem("tab")        
         this.userLoader = false;
       } else {
         this.userLoader = false;
         alert('Something went wrong try again');
       }
     },
       (error) => {  }
     )
    } 
    else
    {
      alert("Please insert and Save Diagnosis first");
      localStorage.setItem('tab','clinicalInfo');
    location.reload()
    }
    }
    
    else{
        this.hospt =""
        this.isRefType =0;
     if(this.depIndex!=undefined && this.depIndex!=0){
          this.param={"referralType":this.isRefType,"convinceType":this.treatmentForm.value.Ambulance,"ptID":this.patInfo.ptID,
          "referralHospital":this.hospt,"refferedTo":this.depIndex,"remarks":this.treatmentForm.value.refNotes,"refferedFrom":this.patInfo.departmentID,"hospitalID":localStorage.getItem('hospitalID')}
       
          this.uService.reffer(this.param).subscribe
          ((response: any) => {
            if (response.status === 0) {
              this.router.navigate(['doctor/user/'])
              localStorage.removeItem("tab")        
              this.userLoader = false;
            } else {
              this.userLoader = false;
              alert('Something went wrong try again');
            }
          },
            (error) => {  }
          )
        }else
        {
          alert("Please select a departement")
        }
        
    }
   
    
   
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
    var temptreat = 0;
    if(this.localTreat.length!=0){
      for(let e of this.localTreat)
        { 
          
        if(e.medicine==medic[0] && e.unit==tVal.unit && e.type==tVal.type1){
        alert("already Exists");
        temptreat= 1;
        this.treatmentForm.patchValue({
          "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "prescribedQuantity": ""
      
         })
        break
       }
    }
    
    if (temptreat == 0)
    {
      
   this.localTreat.push({"prandial":tVal.prandial,"unit":tVal.unit,"type":tVal.type, "remarks":tVal.remarks,"dose":tVal.dose,"medicine":medic[0],"medicineID":this.medId,"prescribedQuantity":tVal.prescribedQuantity,"issuedQuantity":"","duration":""})
   this.treatmentForm.patchValue({
    "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "prescribedQuantity": ""

   })
         }
  }else{
    let medic= tVal.itemName.split(",");
    this.localTreat.push({"prandial":tVal.prandial,"unit":tVal.unit,"type":tVal.type, "remarks":tVal.remarks,"dose":tVal.dose,"medicine":medic[0],"medicineID":this.medId,"prescribedQuantity":tVal.prescribedQuantity,"issuedQuantity":"","duration":""})
    this.treatmentForm.patchValue({
     "itemID":"", "itemName": "", "unit": "", "type": "", "dose": "", "prandial": "", "remarks": "", "prescribedQuantity": ""
 
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
    localStorage.setItem("tab",tab)
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
   
  generatetoken(op){
    let serCall =false;
    let inv =this.investigationForm.value;
    if(inv.selectedValueIndoorDiag!=undefined && this.Indid!=undefined)
    {
      let temp =0;
      if(this.localIndoorData.length!=0){
    for(let e of this.localIndoorData)
    {  
    if(e.id==this.Indid){
  //  alert("Diagnosis already Exists");
    temp = 1;
    break
   }
}
      }
      
if (temp == 0)
{
  this.localIndoorData.push({ "id": this.Indid, "name": inv.selectedValueIndoorDiag,"description":inv.descriptionIndoor }) 
}
this.investigationForm.patchValue({
  'selectedValueIndoorDiag': '',
  'descriptionIndoor':''
})
}
    if(this.localIndoorData.length!=0 && this.localIndoorData!=undefined )
    {

      this.userLoader=true
      if(this.investigationForm.value.termination_date!=undefined && this.investigationForm.value.termination_date!='' && op==1)
      {
        serCall=true;  
        let operateDate = this.datepipe.transform(new Date(this.investigationForm.value.termination_date))//formatting current ///date here 
        this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.patInfo.ptID,"patientID": this.patientID,"departmentID":this.patInfo.departmentID,"diagnosis":this.localIndoorData,"isIndoor":3,"refferedFrom":this.detail.fname,'prescriptionID': this.patInfo.prescriptionID,"admitDate":operateDate}
      
        
      }
      if(this.id!=undefined && op==0)
{   
         
        serCall=true;
        this.param = {'hospitalID': localStorage.getItem('hospitalID'), 'ptID':this.patInfo.ptID,"patientID": this.patientID,"departmentID":this.id,"diagnosis":this.localIndoorData,"isIndoor":this.docType,"refferedFrom":this.detail.fname,'prescriptionID': this.patInfo.prescriptionID}

 }

if(serCall==true){
  this.uService.generatetoken(this.param).subscribe
    ((response: any) => {
      if (response.status === 0) {
        this.router.navigate(["doctor/user"])
       
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
   
  }
else{
  this.userLoader=false

alert("please Select Refferel For Admition or Select a Date for operate")
}
    }
  else{
    this.userLoader=false

    alert("please select diagnoses")
  }
}
  // patient prescription list
  gotoPresDetails(udata) {
    debugger
    localStorage.setItem('pharmacyData',JSON.stringify(udata) );
     window.open('/print/home')
  //   localStorage.setItem('uPresData', JSON.stringify(udata));
  //  // this.router.navigate(['doctor/user/print-presc']);
  //   window.open('doctor/user/print-presc')
    localStorage.removeItem("tab")

  }


  getTwentyFourHourTime(amPmString) {
    var d = new Date("1/1/2013 " + amPmString);
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  gotoPrintPage(){
    this.modalRef.hide();
    //this.router.navigate(['/print/pathology']);
    window.open('/print/pathology')
    
  }

//---------------------update getests---------------------
updateSingleTest(diagnos) {
  console.log('diagnos==', diagnos);

  this.model3.id = this.sData.id;
  this.model3.xrayFilms6 = diagnos.name;
  this.model3.result = diagnos.result;
  this.model3.sample = '';
  this.model3.images = this.imagesArr;

  this.testsArr.push(this.model3);
  
  this.modal24.tests = this.testsArr;
  this.modal24.hospitalID = localStorage.getItem('hospitalID')

  console.log('testsArr ==', this.testsArr);
  console.log('modal24 ==', this.modal24);
  this.uService.updateTests(this.modal24).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====', response);

        this.loaderUpdate = false;
        this.modalRef.hide();
        this.objPath = {};
        this.model3 = {};
        this.modal24 = {};
        this.testsArr = [];
        this.getInvistigation();
      }
      if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUpdate = false;
        alert('Problem in service! please Try again');
        console.log('error=', this.errormsg);
      }
    },
    (error) => {}
  );
}
//--------------------------------

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