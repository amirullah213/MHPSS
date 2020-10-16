import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'ncri-medicine-grn',
  templateUrl: './medicine-grn.component.html',
  styleUrls: ['./medicine-grn.component.scss']
})
export class MedicineGrnComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {

  }
  grnobj:any ={};
  ngOnInit(): void {
  }
}
