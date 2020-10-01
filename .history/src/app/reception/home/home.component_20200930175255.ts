import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  switchBreakEvenView: string = '';
  breakEvenModel:string = "";
  userDetails: any = {
    name: "",
    type: "",
    grade: "",
    branchLocation: "",
    userID: ""
  };

  loader: boolean = false;

  currencyCodesList: any = [];
  currencyForm: FormGroup;
  breakEvenPoint: FormGroup;
  compensationID: string = "";
  breakEvenList: any[] = [];
  edit: boolean = false;
  selectedOBJ: any;
  breakEvenCheck:string = "";
  constructor(
    private service: CommissionService,
    private fb: FormBuilder
  ) {
    this.currencyForm = this.fb.group({
      currency_code: ['USD', Validators.required],
      base_salary: [null, Validators.required],
      commission_rate: [null, Validators.required],
    });

    this.breakEvenPoint = this.fb.group({
      break_even_times: ['', Validators.required],
      mtd_base_target: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getCurrencyCodes();
  }

  getUserDetails() {
    let userData: any = localStorage.getItem('details');
    if (userData !== null) {
      userData = JSON.parse(localStorage.getItem('details'));
      this.userDetails.name = userData.user.first_name + " " + userData.user.last_name;
      this.userDetails.type = userData.user.employee_type_id;
      this.userDetails.grade = userData.user.user_role_id;
      this.userDetails.branchLocation = userData.user.branch_location_id;
      this.userDetails.userID = userData.user.id;
    }
}
//--------------------------------


