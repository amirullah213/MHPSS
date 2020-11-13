import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RadServiceService } from '../services/rad-service.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { APP_CONFIG } from '../../core';
@Component({
  selector: 'ncri-diagnosis-seen-rad',
  templateUrl: './diagnosis-seen-rad.component.html',
  styleUrls: ['./diagnosis-seen-rad.component.scss']
})
export class DiagnosisSeenRadComponent implements OnInit {
  isCollapsed = true;
  userLoader:boolean=false;
  model:any={};
  hospitalID:any;
  doctorID:any;
  userType:any;
  PathResponseArray:any=[];
  errormsg:any;
  patientID:any;
  pathData1:any={};
  userData:any={};
  objPath:any={};
  resultdata:any;
  newArray:any={};
  finalArray:any=[];
  loaderUpdate:boolean=false;
  model2:any={};
  model3:any={};
  singleobj:any={};
  singleArr:any=[];
  xrayString:any;
  modelimg:any={};
  imagesArr:any=[];
  imageUrl:any;



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

  
  modalRef: BsModalRef;

  constructor(
    
    private modalService: BsModalService,
    private fb: FormBuilder,
    private radService: RadServiceService,
    private router: Router,
    private sanitizer:DomSanitizer
    ) {

  }

  ngOnInit(): void {
    this.imageUrl=APP_CONFIG.apiBaseUrl+'getImage';
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.pathData1=JSON.parse(localStorage.getItem('pathDetails'));
console.log('pathData1===',this.pathData1);
console.log('imageUrl===',this.imageUrl)
    // this.userData.status = 0;
   this.getUsersPending();
  }
  openModalWithClass(template: TemplateRef<any>,data) {
    this.userData=data;
    console.log('this.userData',this.userData);
    this.getImages(this.userData.id);
   // this.singleArr=JSON.parse(this.userData.xrayFilms6); 
   // console.log(' this.singleArr',this.singleArr);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
//---------------------get all lab patients---------------------
getUsersPending() {
  this.userLoader= true;
  this.model.hospitalID=this.hospitalID;
   this.model.testType=2;
   this.model.userType=this.userType;
   this.model.patientID=this.pathData1.ptID;
 
 
  console.log('model ==', this.model);
  this.radService.getpendingTests(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        // response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //   this.gettreatmetData.push({"itemName":this.medStr,v});
        //   // console.log('gettreatmetData==',tfhis.gettreatmetData)
        // });
        this.PathResponseArray=response.data;
      console.log('this.PathResponseArray==',this.PathResponseArray);
     // this.openModAdd(cc);
    
        this.userLoader = false;
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.userLoader = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}

stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, 'text/html');
  return doc.body;
  };

   createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
   
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
   }
  //  git images
  getImages(presID) {
    this.userLoader= true;
    this.modelimg.prescriptiontest_id=presID;
    //  this.model.testType=2;
    //  this.model.userType=this.userType;
    //  this.model.patientID=this.pathData1.ptID;
   
   
    console.log('modelimg ==', this.modelimg);
    this.radService.gettestImages(this.modelimg).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log(' response images====',response);
          this.imagesArr=response.data;
          this.getlink();
          this.userLoader = false;
          
        }
    if (response.status === 1) {
          this.errormsg = response.error;
          this.userLoader = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);
          
        }
      },
      (error) => {}
    );
  
  }
  getlink():SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl("C:/path/to/executable");
}
}
