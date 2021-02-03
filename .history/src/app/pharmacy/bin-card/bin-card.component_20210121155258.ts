import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
@Component({
  selector: 'ncri-bin-card',
  templateUrl: './bin-card.component.html',
  styleUrls: ['./bin-card.component.scss']
})
export class BinCardComponent implements OnInit {

  userData: any = {};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  downloadType: string = 'csv';
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  userList: any = []
  modalRef: BsModalRef;

  userType:any=[];
  constructor(private modalService: BsModalService,
     private pharmaService: PharmacyServicesService,
     private router: Router) { }

 

  ngOnInit(): void {
    this.userType= localStorage.getItem('hospitalID');
    this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
   console.log('date now==',this.todayData) ;
   this.getPatCount();
  }
  
 

}
