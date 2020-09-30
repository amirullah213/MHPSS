import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'ncri-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  userData: any = {};
  paramData:any={};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'allUsers';
  downloadType: string = 'csv';
  modalRef: BsModalRef;
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;

  
  userList: any = [];

  constructor(
    private modalService: BsModalService,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
   this.userData.hospitalID=localStorage.getItem('hospitalID');
   this.userData.status=0;
   this.userData.doctorID=localStorage.getItem('docId');
   

    this.getPats(this.userData);
  }

  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }

  openModalActivate(userActivate: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(userActivate, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModalDeactivate(userDeactivate: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(userDeactivate, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }

  openDeleteUser(deleteUser: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(deleteUser, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }

  getPats(obj:any) {
console.log('called',obj)
    this.userLoader = true;
    
    this.service.usersList(obj).subscribe
      ((response:any)=> {
        debugger
        if(response.status === -1 || response.status === 1 || response.status === 0){
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

  downloadUserList() {
    //debugger
    let obj = {
      output_format: this.downloadType,
    };
    this.service.downloadList(obj).subscribe(
      (res: any) => {
        //debugger
        if (res.status === 'success') {
          //debugger
        }
      },
      (error) => {
        //debugger
      }
    );
  }

 
  downloadFile() {
    var url =
      'https://8o51sigf6i.execute-api.us-east-1.amazonaws.com/dev/api/v1/uam/DownloadUsersList/';
    if (this.downloadType === 'xlsx') {
      var xhr = new XMLHttpRequest();
      const details = JSON.parse(localStorage.getItem('details'));
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Authorization', `JWT ${details.token}`);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.response);
          /// console.log(xhr.responseText);
          var hiddenElement = document.createElement('a');
          hiddenElement.href = window.URL.createObjectURL(xhr.response);
          //hiddenElement.target = '_blank';
          hiddenElement.download = 'data.xlsx';
          hiddenElement.click();
        }
      };
      var data = '{"output_format": "' + this.downloadType + '"}';
      xhr.send(data);
    } else {
      var xhr = new XMLHttpRequest();
      const details = JSON.parse(localStorage.getItem('details'));
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `JWT ${details.token}`);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          var hiddenElement = document.createElement('a');
          hiddenElement.href =
            'data:text/csv;charset=utf-8,' + encodeURI(xhr.responseText);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'data.csv';
          hiddenElement.click();
        }
      };
      var data = '{"output_format": "' + this.downloadType + '"}';
      xhr.send(data);
    }
  }
  //activate User
 

  //activate User
  deactivateUser(ob: any) {
    this.deactivateLoader = true;
    let obj = {
      id: ob,
    };
    this.service.lockUser(obj).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.deactivateLoader = false;
          this.modalRef.hide();
          this.getPats(obj);

          // this.router.navigate(['/user']);
        } else {
          this.deactivateLoader = true;
          alert('Something went wrong try again');
        }
      },
      (error) => {}
    );
  }

  redirectToCreateUser(id: any, type: any) {
    if (type === 'view') {
      this.router.navigate(['/user/add'], {
        queryParams: { type: 'view', id: id },
      });
    } else {
      this.router.navigate(['/user/add'], {
        queryParams: { type: 'edit', id: id },
      });
    }
  }

  // confirmDelete(obj:any){
  //   let check = confirm("Are you sure you want to delete this user "+obj.first_name + ' ' + obj.last_name+"");
  //   check ? this.deleteUser(obj.id) : "";
  // }

  deleteUserMethod() {
    this.loader = true;
    this.responseText = '';
    let obj = {
      id: this.userData.id,
    };
    this.service.deleteUser(obj).subscribe(
      (res: any) => {
        if (res.status === 'success') {
          this.getPats(obj);
          this.modalRef.hide();
        } else {
          this.responseText = res.code;
        }

        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.responseText = 'Sorry something went wrong, Try again.';
      }
    );
  }
}
