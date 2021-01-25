import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PharmacyServicesService } from '../services/pharmacy-services.service';

@Component({
  selector: 'ncri-bincard-items',
  templateUrl: './bincard-items.component.html',
  styleUrls: ['./bincard-items.component.scss']
})
export class BincardItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
