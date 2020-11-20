import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-all-pats',
  templateUrl: './all-pats.component.html',
  styleUrls: ['./all-pats.component.scss']
})
export class AllPatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  gotoPrintPage(){
    //this.modalRef.hide();
    //this.router.navigate(['/print/pathology']);
    window.open('/print/home')
    
  }
}
