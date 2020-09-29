import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountSettingService } from '../services/account-setting.service';

@Component({
  selector: 'ncri-account-preference',
  templateUrl: './account-preference.component.html',
  styleUrls: ['./account-preference.component.scss']
})
export class AccountPreferenceComponent implements OnInit {

  loader: boolean = false;
  error: boolean = false;
  responseText: string = "";
  modalRef: BsModalRef;
  constructor(
    private service: AccountSettingService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  deactivateAccount(){
    this.loader = true;
    this.responseText = "";
    this.service.deactivateAccount().subscribe((res) => {
      
      this.modalRef.hide();
      if(res.status === "error"){
        this.error = true;
        this.responseText = "Cannot process your request, Try again later.";
      }else{
        
        this.error = false;
        let counter = 3;
        this.responseText = "Your account successfully deactivated. you will be logout in "+counter+"";
        setInterval(() => {
          counter -= 1;
          if(counter > 0){
            this.responseText = "Your account successfully deactivated. you will be logout in "+counter+"";
          }else{
            localStorage.removeItem('details');
            this.router.navigateByUrl('/signin');
          }
        },1000)
        
      }
      this.loader = false;
    },(error) => {
      
      this.loader = false;
      this.modalRef.hide();
      this.error = true;
      this.responseText = "Sorry, something went wrong";
    })
  }

  openModal(modal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modal);

  }

  // confirmDialog(){
  //   let check = confirm("Are you sure you want to deactivate this account!");
  //   check === true ? this.deactivateAccount() : "";
  // }

}
