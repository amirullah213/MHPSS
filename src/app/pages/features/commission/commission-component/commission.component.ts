import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommissionService } from '../service';

@Component({
  selector: 'ncri-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {
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

  getCurrencyCodes() {
    this.service.getCurrencyCode().subscribe((res) => {

      if (res.status === "success") {
        for (var key in res.data) {
          this.currencyCodesList.push(key);
        }
      }
      console.log(this.currencyCodesList);
    }, (error) => {

    })
  }


  addCompensation(type: string) {
    let obj = Object.assign(this.currencyForm.getRawValue(), {});
    obj.base_salary = parseInt(obj.base_salary)
    obj.user_id = this.userDetails.userID;
    obj.break_even_type = type.toUpperCase();
    this.service.addCompensation(obj).subscribe((res) => {
      if (res.status === "error") {
        this.switchBreakEvenView = "";
        this.compensationID = "";
        alert("Sorry something wen wrong.");
        this.breakEvenCheck = "";
      } else {
        this.switchBreakEvenView = type;
        this.breakEvenCheck = type === 'f' ? 'flat' : 'tier';
        this.compensationID = res.data.id;

        //disabling fields
        this.currencyForm.controls.base_salary.disable();
        this.currencyForm.controls.currency_code.disable();
        this.currencyForm.controls.commission_rate.disable();
      }

    }, (error) => {
      this.compensationID = "";
      this.switchBreakEvenView = '';
    })
  }

  addBreakEvenPoint(form: any) {
    this.loader = true;
    form.commission_compensation_id = this.compensationID;
    form.mtd_base_target = this.switchBreakEvenView === 't' ? parseInt(form.mtd_base_target) : 0;
    form.break_even_target = 0;
    this.service.addBreakEven(form).subscribe((res) => {
      debugger
      if (res.status === "error") {
        alert("Sorry something went wrong");
      } else {
        // let obj = {
        //   id: res.data.id,
        //   break_even_times: form.break_even_times,
        //   mtd_base_target: form.mtd_base_target
        // }
        form.id = res.data.id;
        this.breakEvenList.unshift(form);
        this.breakEvenPoint.reset();
        this.breakEvenModel = "";
      }
      this.loader = false;
    }, (error) => {
      debugger
      this.loader = false;
    })
  }

  deleteBreakEvenPoint(id: any, index) {
    let obj = {
      id: id
    }
    this.service.deleteBreakEven(obj).subscribe((res) => {

      if (res.status === "error") {
        alert("Could not delete event point");
      } else {
        this.breakEvenList.splice(index, 1);
      }
    }, (error) => {

    })
  }

  confirmDelete(obj: any, index: any) {
    let check = confirm("Are you sure you want to delete this even point");
    check === true ? this.deleteBreakEvenPoint(obj.id, index) : "";
  }

  viewEdit(obj: any) {
    this.edit = true;
    this.selectedOBJ = obj;
    this.breakEvenPoint.controls.break_even_times.setValue(obj.break_even_times);
    this.breakEvenPoint.controls.mtd_base_target.setValue(obj.mtd_base_target);
  }

  updateBreakEvenPoint(form: any) {
    this.loader = true;
    form.commission_compensation_id = this.compensationID;
    form.mtd_base_target = parseInt(form.mtd_base_target);
    form.break_even_target = 0;
    form.id = this.selectedOBJ.id;

    this.service.updateBreakEven(form).subscribe((res) => {
      if (res.status === "error") {
        alert("Sorry something went wrong");
      } else {
        let i = this.breakEvenList.findIndex(it => it.id === form.id);
        i !== -1 ? this.breakEvenList[i] = form : "";
        this.breakEvenPoint.reset();
      }
      this.loader = false;
      this.edit = false;
    }, (error) => {
      this.loader = false;
      this.edit = false;
    })
  }
}
