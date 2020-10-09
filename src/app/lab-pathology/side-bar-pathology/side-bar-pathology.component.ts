import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-side-bar-pathology',
  templateUrl: './side-bar-pathology.component.html',
  styleUrls: ['./side-bar-pathology.component.scss']
})
export class SideBarPathologyComponent implements OnInit {
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
