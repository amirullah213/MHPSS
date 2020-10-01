import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.scss']
})
export class SideBarAdminComponent implements OnInit {
  toggleIcon: string = 'ti-plus'
  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  //toggle Collapse
  toggleCollapse(el:any){
    if(el?.classList?.contains('collapse')){
      el?.classList?.remove('collapse');
      this.toggleIcon = 'ti-minus';
    }else{
      el?.classList?.add('collapse');
      this.toggleIcon = 'ti-plus';
    }
  }
}
