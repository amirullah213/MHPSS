import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-side-bar-reception',
  templateUrl: './side-bar-reception.component.html',
  styleUrls: ['./side-bar-reception.component.scss']
})
export class SideBarReceptionComponent implements OnInit {
  toggleIcon: string = 'ti-plus'
  constructor(public router: Router) { }

  ngOnInit(): void {
  } toggleCollapse(el: any) {
    if (el?.classList?.contains('collapse')) {
      el?.classList?.remove('collapse');
      this.toggleIcon = 'ti-minus';
    } else {
      el?.classList?.add('collapse');
      this.toggleIcon = 'ti-plus';
    }
  }

}
