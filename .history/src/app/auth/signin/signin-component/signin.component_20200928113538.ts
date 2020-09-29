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
    this.responseText = "";
    this.signInLoader=true;
    this.showError = false;
   // form.hostname = location.origin;
    this.auth.loginPms(form)
    .subscribe((response:any)=> {
      if(response.status === "error"){
        this.showError = true;
        this.signInLoader=false;
        this.responseText = response.code;
      }else{
        // response.data.ticket_type = 'm';
      
        this.ticket = response.data;
        localStorage.setItem('details', this.ticket);
        console.log('login resp==',this.ticket.userType);
        if(this.ticket.userType==1){ this.router.navigate(['/user']);}
       
        
      }
      
    },(error)=>{
      console.log(error);
       this.showError = true;
      this.signInLoader=false;
      this.responseText = "Sorry something went wrong, Try again later";
    })
  }

  obtainJWT(obj:any){
    this.showError = false;
    this.responseText = "";
    this.auth.getJWTToken(obj)
    .subscribe((response:any)=> {
      if(response.status === "success"){
        this.signInLoader=false;
        this.showError = false;
        localStorage.setItem('details', JSON.stringify(response.data));
        if(response.data.user.default_password_changed === false){
          this.signInLoader=false;
          this.router.navigate(['/user/change-password']);
        }else{
          this.signInLoader=false;
          this.router.navigate(['/user']);
        }
        
      }else{
        this.signInLoader=false;
        this.showError = true;
        this.responseText = response.code;
      }

    },(error)=>{
      console.log(error);
      this.showError = true;
      this.signInLoader=false;
      this.responseText = "Sorry something went wrong, Try again later";
      // this.showError = true;
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
