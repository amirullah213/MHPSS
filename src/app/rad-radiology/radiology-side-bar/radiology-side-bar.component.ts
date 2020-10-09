import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'ncri-radiology-side-bar',
  templateUrl: './radiology-side-bar.component.html',
  styleUrls: ['./radiology-side-bar.component.scss']
})
export class RadiologySideBarComponent implements OnInit {
  toggleIcon: string = 'ti-plus'
  constructor(public router: Router) { }

  ngOnInit(): void {
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
