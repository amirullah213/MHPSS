import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccountSettingService } from '../services/account-setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  changePassword: FormGroup;
  createUserLoader:boolean=false;
  matchPasswordCheck: boolean = false;
  loader2: boolean = false;
  constructor(private fb: FormBuilder, private accountServive: AccountSettingService,private router: Router) {
    this.changePassword = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(1)]],
      new_password: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/), Validators.required])],
      confirm_password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void { }
// convenience getter for easy access to form fields
  get f() { 
    console.log('f called==',this.changePassword)
      return this.changePassword;
     }
     updatePassword(ob:any){
       this.loader2 = true;
       this.accountServive.changePassword(ob).subscribe((res) => {
        if(res.status === "success"){
          this.loader2=false;
          this.router.navigate(['/user']);
        }
        if(res.code === "ERR_Forbidden"){
           alert('Old password is not correct');
           this.loader2=false;
        }else{
          this.loader2=false;
          alert("Something went wrong try again");
        }
      },(error)=>{
        this.loader2=false;
      })
     }
     matchPassword() {
      if (this.changePassword.controls.new_password.value !== this.changePassword.controls.confirm_password.value) {
        this.matchPasswordCheck = true;
      } else {
        this.matchPasswordCheck = false;
      }
    }

    checkPassword(){
      debugger
      if(this.changePassword.controls.confirm_password.value){
        this.matchPassword();
      }
    }

}
