import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../core';


@Component({
  selector: 'ncri-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  @ViewChild('password') passField: ElementRef;
  changeIcon: boolean = false;
  loginLoading: boolean = false;

  showQRForm: boolean = false;
  showQRImage: boolean = false;
  QRCode: string = "";
  QRImage: any = "";

  responseText: string = "";

  signIn: FormGroup;
  error: boolean = false;
  errorMessage: string = '';
  showError: boolean;
  signInLoader:boolean=false;
  ticket: any = "";

  constructor(
    private router: Router,
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
  loginFunc(form:any){
    this.auth.setUser(44);
  }
  // loginFunc(form:any){
  //   this.responseText = "";
  //   this.signInLoader=true;
  //   this.showError = false;
  //  this.auth.loginPms(form)
  //   .subscribe((response:any)=> {
  //     if(response.status === -1 || response.status === 1){
  //       console.log(response.errorType );
  //       this.showError = true;
  //       this.signInLoader=false;
  //       this.responseText = "Sorry something went wrong, Try again later";
  //     }else{
  //      this.ticket = response.data;
  //       localStorage.setItem('details', this.ticket);
  //       console.log('login resp==',this.ticket);
  //       console.log('user resp==',this.ticket.userType);
  //       this.signInLoader=false;
  //       this.auth.setUser(this.ticket);
        
  //     }
      
  //   },(errorType)=>{
  //     console.log(errorType);
  //      this.showError = true;
  //     this.signInLoader=false;
  //     this.responseText = "Sorry something went wrong, Try again later";
  //   })
  // }

  
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
