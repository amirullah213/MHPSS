import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService, GlobalService } from 'src/app/core';

@Component({
  selector: 'ncri-doctor-singin',
  templateUrl: './doctor-singin.component.html',
  styleUrls: ['./doctor-singin.component.scss']
})
export class DoctorSinginComponent implements OnInit {
  signIn: FormGroup;
  @ViewChild('password') passField: ElementRef;
  changeIcon: boolean = false;
  loginLoading: boolean = false;
  showQRForm: boolean = false;
  showQRImage: boolean = false;
  QRCode: string = "";
  QRImage: any = "";

  responseText: string = "";

  error: boolean = false;
  errorMessage: string = '';
  showError: boolean;
  signInLoader:boolean=false;
  ticket: any = "";
  constructor(  private router: Router,
    private zone: NgZone,
    public global: GlobalService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.signIn = this.formBuilder.group({
      'userName': ['', Validators.compose([Validators.required])],
      'pw': ['', Validators.compose([Validators.required])]
    });
  } 
  ngOnInit(): void {
  }
  userlogin(form:any){
    this.responseText = "";
    this.signInLoader=true;
    this.showError = false;
   this.auth.userlogin(form)
    .subscribe((response:any)=> {
      if(response.status === -1 || response.status === 1){
        console.log(response.errorType );
        this.showError = true;
        this.signInLoader=false;
        this.responseText = "Sorry something went wrong, Try again later";
      }else{
       this.ticket = response.data;
      
        this.signInLoader=false;
       // this.auth.setUser(this.ticket);
       localStorage.setItem("docDetails",JSON.stringify(this.ticket));
       this.router.navigate(['/doctor'])
      }
    },(errorType)=>{
      console.log(errorType);
       this.showError = true;
      this.signInLoader=false;
      this.responseText = "Sorry something went wrong, Try again later";
    })
  }  
  changeType(){
    if(this.passField.nativeElement.type === "password"){
      this.passField.nativeElement.type = "text";
      this.changeIcon = true;
    }else{
      this.passField.nativeElement.type = "password"
      this.changeIcon = false;
    }
  }
}


