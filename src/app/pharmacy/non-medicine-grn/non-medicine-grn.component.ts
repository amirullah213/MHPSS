import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'ncri-non-medicine-grn',
  templateUrl: './non-medicine-grn.component.html',
  styleUrls: ['./non-medicine-grn.component.scss']
})
export class NonMedicineGrnComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
