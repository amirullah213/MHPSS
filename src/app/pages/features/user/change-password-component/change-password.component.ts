import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordUpdate: FormGroup;
  createUserLoader:boolean=false;
  matchPasswordCheck: boolean = false;
  loader: boolean = false;
  constructor(private fb: FormBuilder, private service: UserService,private router: Router) {
    this.passwordUpdate = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(1)]],
      confirm_password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void { }
// convenience getter for easy access to form fields
  get f() { 
    console.log('f called==',this.passwordUpdate)
      return this.passwordUpdate;
     }
     updatePassword(ob:any){
       this.loader = true;
       this.service.updatePassword(ob).subscribe((res) => {
        if(res.status === "success"){
          this.loader=false;
          this.router.navigate(['/user']);
        }else{
          this.loader=false;
          alert("Something went wrong try again");
        }
      },(error)=>{
        this.loader=false;
      })
     }
     matchPassword() {
      if (this.passwordUpdate.controls.new_password.value !== this.passwordUpdate.controls.confirm_password.value) {
        this.matchPasswordCheck = true;
      } else {
        this.matchPasswordCheck = false;
      }
    }
}
