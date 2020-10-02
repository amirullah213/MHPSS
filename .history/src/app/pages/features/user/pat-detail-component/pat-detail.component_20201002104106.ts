import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../../core';


@Component({
  selector: 'ncri-create-user',
  templateUrl: './pat-detail.component.html',
  styleUrls: ['./pat-detail.component.scss']
})
export class PatDetailComponent implements OnInit {
  tab: string = 'employee'
  employeeInformation: FormGroup;
  userLoader: boolean = false;
  userGroups: any[] = [];
  createUserLoader:boolean=false;
  error: boolean = false;
  errorMessage: any = '';
  patInfo:any ={};

  param: any = {
    id:"",
    type:""
  };
  selectedUser: any;
  constructor(
    private fb: FormBuilder,
     private service: UserService,
     private router: Router,
     private route: ActivatedRoute
     ) {

  }

  ngOnInit(): void {
    this.patInfo= JSON.parse(localStorage.getItem("patData"));
    console.log('patInfo====',this.patInfo)
    this.getPatPrescrib(this.patInfo);
     
  }
  
  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }
 
   //patient prescription list
   getPatPrescrib(obj:any) {
      this.userLoader = true;
      this.auth.userList(obj).subscribe
      ((response:any)=> {
      if(response.status === 0 ){
          console.log(response );
          this.userList = response.data;
          console.log('userList',this.userList)
         this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
      (error) => {}
    );
  }
// patient prescription list

  // create user
  createUser(){
   // debugger;
    let form: any = Object.assign({},this.employeeInformation.value, this.contactInformation.value, this.accessControl.value);
    form.system_access_ip_addresses?form.system_access_ip_addresses = form.system_access_ip_addresses.map(it=>it.ip) : '';
    console.log(form); 
    this.subscriptions[this.subscriptions.length] = this.service.createUser(form)
      .subscribe((response) => {
        if (response?.status === 'success') {
          console.log(response);
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  
  // departmentDropdownList
  departmentDropdownList() {
    this.subscriptions[this.subscriptions.length] = this.service.departmentDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.departments = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // employeeTypeDropdownList
  employeeTypeDropdownList() {
    this.subscriptions[this.subscriptions.length] = this.service.employeeTypeDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.employeeTypes = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // timeZoneDropdownList
  timeZoneDropdownList() {
    this.subscriptions[this.subscriptions.length] = this.service.timeZoneDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.timeZones = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // userGroupDropdownList
  userGroupDropdownList() {
    this.subscriptions[this.subscriptions.length] = this.service.getUserRoles()
      .subscribe((response:any) => {
        if (response?.status === 'success') {
          this.userGroups = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }


  ngOnDestroy(){
    this.subscriptions.forEach(subscription => {
      if(subscription)subscription.unsubscribe();
    });
  }
  
  // on access type control
  onAccessType(event:any){
    console.log("called on load")
    if(event.currentTarget.value === 'laptop'){
       this.accessControl.get('laptop_access_enabled').setValue(true);
       this.accessControl.get('mobile_access_enabled').setValue(false);
       this.accessControl.get('desktop_access_enabled').setValue(false);
       this.accessControl.get('mobile_access_imei').reset();
       this.accessControl.get('laptop_access_mac_address').reset();
       this.accessControl.get('desktop_access_mac_address').reset();
    }else if(event.currentTarget.value === 'mobile'){
      this.accessControl.get('laptop_access_enabled').setValue(false);
       this.accessControl.get('mobile_access_enabled').setValue(true);
       this.accessControl.get('desktop_access_enabled').setValue(false);
       this.accessControl.get('mobile_access_imei').reset();
       this.accessControl.get('laptop_access_mac_address').reset();
       this.accessControl.get('desktop_access_mac_address').reset();
    }else if(event.currentTarget.value === 'system'){
      this.accessControl.get('laptop_access_enabled').setValue(false);
      this.accessControl.get('mobile_access_enabled').setValue(false);
      this.accessControl.get('desktop_access_enabled').setValue(true);
      this.accessControl.get('mobile_access_imei').reset();
       this.accessControl.get('laptop_access_mac_address').reset();
       this.accessControl.get('desktop_access_mac_address').reset();
    }
  }
  // on access control
  onAccessHoursControl(event:any){
    console.log("called on load")
    if(event.currentTarget.checked){
       this.enableControls();
    }else{
     this.disableControls();
    }
  }
  // enable access hours controls
  disableControls(){
    this.accessControl.get('access_hours_start_time').disable();
    this.accessControl.get('access_hours_end_time').disable();
    this.accessControl.get('access_hours_timezone').disable();
    this.accessControl.get('access_hours_start_time').reset();
    this.accessControl.get('access_hours_end_time').reset();
    this.accessControl.get('access_hours_timezone').reset();
    this.accessControl.get('weekends_access_blocked').setValue(false);
  }
  // enable access hours controls
  enableControls(){
    this.accessControl.get('access_hours_start_time').enable();
    this.accessControl.get('access_hours_end_time').enable();
    this.accessControl.get('access_hours_timezone').enable();
    this.accessControl.get('access_hours_start_time').reset();
    this.accessControl.get('access_hours_end_time').reset();
    this.accessControl.get('access_hours_timezone').reset();
    this.accessControl.get('weekends_access_blocked').setValue(false);
  }

  submitForm(form:any){
    if(this.employeeInformation.valid && this.contactInformation.valid && this.accessControl.valid){
      this.createUserLoader=true;
    let obj = {...this.employeeInformation.value, ...this.contactInformation.value, ...this.accessControl.value};
    obj.date_of_joining = new Date(obj.date_of_joining);
    obj.termination_date = new Date(obj.termination_date);

    if(obj.date_of_joining)obj.date_of_joining = obj.date_of_joining.getFullYear() + "-"+((obj.date_of_joining.getMonth() + 1) < 10 ? ('0'+(obj.date_of_joining.getMonth() + 1)) : (obj.date_of_joining.getMonth() + 1))+"-"+obj.date_of_joining.getDate();
    if(obj.termination_date)obj.termination_date = obj.termination_date.getFullYear() + "-"+((obj.termination_date.getMonth() + 1) < 10 ? ('0'+(obj.termination_date.getMonth() + 1)) : (obj.termination_date.getMonth() + 1))+"-"+obj.termination_date.getDate();
    if(obj.system_access_ip_addresses)obj.system_access_ip_addresses = obj.system_access_ip_addresses.map(it => it.ip);
    //obj.mobile_access_imei = "010934006587651";
    if(obj.logout_inactivity_minutes)obj.logout_inactivity_minutes = parseInt(obj.logout_inactivity_minutes);

    if(obj.access_hours_start_time){
      obj.access_hours_start_time = this.getTwentyFourHourTime(obj.access_hours_start_time);
    }else{
      obj.access_hours_start_time = "00:00" ;
    }
    if(obj.access_hours_end_time){
      obj.access_hours_end_time = this.getTwentyFourHourTime(obj.access_hours_end_time);
    }else{
      obj.access_hours_end_time = "00:00" ;
    }
    if(!obj.desktop_access_mac_address)obj.desktop_access_mac_address = '';
    if(!obj.laptop_access_mac_address)obj.laptop_access_mac_address = '';
    if(!obj.mobile_access_imei)obj.mobile_access_imei = '';
    // obj.date_of_joining = "2010-08-05"
    // obj.termination_date = "2010-08-05"
    // this.accessControl
    // this.contactInformation
    // this.employeeInformation
    this.param.id ? this.editUser(obj) : this.addUser(obj);
    }
  }

   getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
}
  addUser(obj:any){
    this.error = false;
    this.service.createUser(obj).subscribe((res) => {
      if(res.status === "success"){
        this.createUserLoader=false;
        this.error = false;
        this.router.navigate(['/user']);
      }else{
        this.createUserLoader=false;
        if(res.errors && res.errors.non_field_errors){
          res.errors.non_field_errors.length > 0 ? this.errorMessage = res.errors.non_field_errors[0] : this.errorMessage = 'Something went wrong try again';
        }else{
          this.errorMessage = 'Something went wrong try again';
        }
        this.error = true;
        //console.log("Something went wrong try again");
      }
    },(error)=>{
      this.createUserLoader=false;
      this.errorMessage = 'Something went wrong try again';
      this.error = true;
    })
  }

  editUser(obj:any){
    this.error = false;
    obj.user_id = this.param.id;
    obj.username = obj.email;
    this.service.editUser(obj).subscribe((res) => {
      if(res.status === "success"){
        this.createUserLoader=false;
        this.error = false;
        this.router.navigate(['/user']);
      }else{
        this.createUserLoader=false;
        if(res.errors && res.errors.non_field_errors){
          res.errors.non_field_errors.length > 0 ? this.errorMessage = res.errors.non_field_errors[0] : this.errorMessage = 'Something went wrong try again';
        }else{
          this.errorMessage = 'Something went wrong try again';
        }
        this.error = true;
        //console.log("Something went wrong try again");
      }
    },(error)=>{
      this.createUserLoader=false;
      this.errorMessage = 'Something went wrong try again';
      this.error = true;
    })
  }

  test($event){
   // debugger;
    console.log($event)
  }

  validateEmail(){
    this.isEmailAvailable = false;
    let obj = {
      email: this.contactInformation.controls.email.value
    }
    if(!this.contactInformation.controls.email.valid){
      return
    }
    this.service.validateEmail(obj).subscribe((res:any) => {
      
      if(res.status === "success"){
        if(res.data.is_available){
          this.isEmailAvailable = false;
        }else{
          this.isEmailAvailable = true;
        }
        
      }else{
        this.isEmailAvailable = true;
      }
    }, (error)=>{
      this.isEmailAvailable = true;
    })
  }

  fetchUserDetailsByID(){
    let obj = {
      id: this.param.id
    }
    this.service.fetchUserByID(obj).subscribe((res) => {
      
      if(res.status === "success"){
        this.selectedUser = res.data;

        if(this.param.type === "view"){
          this.employeeInformation.disable();
          this.contactInformation.disable();
          this.accessControl.disable();
        }
        

        this.employeeInformation.controls.first_name.setValue(res.data.first_name);
        this.employeeInformation.controls.last_name.setValue(res.data.last_name);

        this.employeeInformation.controls.password.setValue("**********");
        this.employeeInformation.controls.user_role_id.setValue(res.data.user_role_id);
        this.employeeInformation.controls.employee_type_id.setValue(res.data.employee_type_id);

        this.employeeInformation.controls.date_of_joining.setValue(res.data.date_of_joining);

        this.employeeInformation.controls.termination_date.setValue(res.data.termination_date);

        this.employeeInformation.controls.department_id.setValue(res.data.department_id);
        this.employeeInformation.controls.use_client_percentage.setValue(res.data.use_client_percentage);


        this.contactInformation.controls.country_code.setValue(res.data.country_code);
        this.contactInformation.controls.cell_number.setValue(res.data.cell_number);
        this.contactInformation.controls.phone.setValue(res.data.phone);
        this.contactInformation.controls.branch_location_id.setValue(res.data.branch_location_id);
        this.contactInformation.controls.email.setValue(res.data.email);

        this.accessControl.controls.system_access_enabled.setValue(res.data.system_access_enabled);

        this.accessControl.controls.mobile_access_enabled.setValue(res.data.mobile_access_enabled);

        this.accessControl.controls.desktop_access_enabled.setValue(res.data.desktop_access_enabled);

        this.accessControl.controls.mobile_access_imei.setValue(res.data.mobile_access_imei);

        this.accessControl.controls.laptop_access_enabled.setValue(res.data.laptop_access_enabled);

       
        
        this.accessControl.controls.desktop_access_mac_address.setValue(res.data.desktop_access_mac_address);

        this.accessControl.controls.laptop_access_mac_address.setValue(res.data.laptop_access_mac_address);

        if(res.data.access_hours_enabled === false){
          this.disableControls();
        }else{
          
          this.enableControls();
        }
        this.accessControl.controls.access_hours_enabled.setValue(res.data.access_hours_enabled);

        this.accessControl.controls.access_hours_start_time.setValue(res.data.access_hours_start_time);

        this.accessControl.controls.access_hours_end_time.setValue(res.data.access_hours_end_time);

        this.accessControl.controls.access_hours_timezone.setValue(res.data.access_hours_timezone);

        this.accessControl.controls.weekends_access_blocked.setValue(res.data.weekends_access_blocked);

        this.accessControl.controls.logout_inactivity_minutes.setValue(res.data.logout_inactivity_minutes);
        this.accessControl.controls.ip_address_access_enabled.setValue(res.data.ip_address_access_enabled);
        if(res.data.system_access_ip_addresses.length > 0){
          for(var i = 0; i<res.data.system_access_ip_addresses.length; i++){
            const ips = this.accessControl.get('system_access_ip_addresses') as FormArray;
            ips.push(this.fb.group({
              ip:[res.data.system_access_ip_addresses[i].ip_address]
            }));
          }
          
        }else{
          this.accessControl.controls.system_access_ip_addresses.setValue([]);   
        }

        if(res.data.mobile_access_enabled === true){
          this.accessControl.controls.access_type.setValue("mobile");
        }else if(res.data.laptop_access_enabled === true){
          this.accessControl.controls.access_type.setValue("laptop");
        }else if(res.data.desktop_access_enabled === true){
          this.accessControl.controls.access_type.setValue("desktop");
        }

      }else{
        alert(res.code);
      }
    },(error)=>{
      
    })
  }
}
