import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../user.service';
import { DataTableDirective } from 'angular-datatables';
import { GlobalService, AuthService, APP_CONFIG } from '../../../../core';

@Component({
  selector: 'ncri-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  // @ViewChild(DataTableDirective, { static: false })
  // dtElement: DataTableDirective;

  userData: any = {};
  paramData: any = {};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  downloadType: string = 'csv';
  modalRef: BsModalRef;
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  userList: any = [];
  detail: any;
  interval: number;

  constructor(
    private modalService: BsModalService,
    private service: UserService,
    private router: Router,
    private auth: AuthService
  ) {



    if(this.router.url === '/doctor/user'){
       this.interval = setInterval(() => {
                  this.getUsers(this.userData); // api call
               }, 30000);
   }
  
  
   

  }
  ngOnInit(): void {
    this.userData.hospitalID = localStorage.getItem('hospitalID');
    this.userData.status = 0;
    this.userData.doctorID = localStorage.getItem('docId');
    this.detail = JSON.parse(localStorage.getItem("details"));
  
    this.getUsers(this.userData);
    if (localStorage.getItem("tab"))
    this.setTab(localStorage.getItem("tab"))
  }
  ngOnDestroy() {
   if (this.interval) {
     clearInterval(this.interval);
   }
 }
  //set tab
  setTab(tab: string) {
    localStorage.setItem("tab", tab)
    if (tab == 'newPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 0;
      this.getUsers(this.userData)
    };
    if (tab == 'penPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 1;
      this.getUsers(this.userData)
    };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 2;
      this.getUsers(this.userData)
    };
  }


  gotoPresDetails(udata) {
    debugger
    localStorage.setItem('patData', JSON.stringify(udata));
    //  this.router.navigate(['doctor/user/print-presc'])
    window.open('doctor/user/print-presc')
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



 

  getUsers(obj: any) {

    this.userLoader = true;
    this.auth.userList(obj).subscribe
      ((response: any) => {
        if (response.status === 0) {
          console.log(response);
          this.userList = response.data;
          console.log('userList', this.userList)
          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
      (error) => { }
      );
  }

  gotoPatDetails(paObj) {


    localStorage.setItem('patData', JSON.stringify(paObj));
   if(paObj.deptType==3)
   {
    this.router.navigate(['/epi/child-vaccination'])
    localStorage.removeItem("tab")
   } else if(paObj.deptType==2){
    this.router.navigate(['/epi/tt-vaccination'])
    localStorage.removeItem("tab")
   }
   else{
    this.router.navigate(['doctor/user/details'])
    localStorage.removeItem("tab")
   }
  }


  // downloadFile() {
  //   var url =
  //     'https://8o51sigf6i.execute-api.us-east-1.amazonaws.com/dev/api/v1/uam/DownloadUsersList/';
  //   if (this.downloadType === 'xlsx') {
  //     var xhr = new XMLHttpRequest();
  //     const details = JSON.parse(localStorage.getItem('details'));
  //     xhr.open('POST', url);
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.responseType = 'blob';
  //     xhr.setRequestHeader('Authorization', `JWT ${details.token}`);
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState === 4) {
  //         console.log(xhr.response);

  //         var hiddenElement = document.createElement('a');
  //         hiddenElement.href = window.URL.createObjectURL(xhr.response);

  //         hiddenElement.download = 'data.xlsx';
  //         hiddenElement.click();
  //       }
  //     };
  //     var data = '{"output_format": "' + this.downloadType + '"}';
  //     xhr.send(data);
  //   } else {
  //     var xhr = new XMLHttpRequest();
  //     const details = JSON.parse(localStorage.getItem('details'));
  //     xhr.open('POST', url);
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.setRequestHeader('Authorization', `JWT ${details.token}`);
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState === 4) {
  //         console.log(xhr.status);
  //         console.log(xhr.responseText);
  //         var hiddenElement = document.createElement('a');
  //         hiddenElement.href =
  //           'data:text/csv;charset=utf-8,' + encodeURI(xhr.responseText);
  //         hiddenElement.target = '_blank';
  //         hiddenElement.download = 'data.csv';
  //         hiddenElement.click();
  //       }
  //     };
  //     var data = '{"output_format": "' + this.downloadType + '"}';
  //     xhr.send(data);
  //   }
  // }
  //activate User


  //activate User




  // confirmDelete(obj:any){
  //   let check = confirm("Are you sure you want to delete this user "+obj.first_name + ' ' + obj.last_name+"");
  //   check ? this.deleteUser(obj.id) : "";
  // }


}
