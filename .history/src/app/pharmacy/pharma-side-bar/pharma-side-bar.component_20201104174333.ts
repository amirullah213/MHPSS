import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-pharma-side-bar',
  templateUrl: './pharma-side-bar.component.html',
  styleUrls: ['./pharma-side-bar.component.scss']
})
export class PharmaSideBarComponent implements OnInit {
  toggleIcon: string = 'ti-plus'
  constructor(public router: Router) { }
  userData:any={};
  pharmacyID:any;
  ngOnInit(): void {
    this.pharmacyID=localStorage.getItem('docId');
    console.log('this.pharmacyID====',this.pharmacyID)
  }
  toggleCollapse(el: any) {
    if (el?.classList?.contains('collapse')) {
      el?.classList?.remove('collapse');
      this.toggleIcon = 'ti-minus';
    } else {
      el?.classList?.add('collapse');
      this.toggleIcon = 'ti-plus';
    }
  }
}
