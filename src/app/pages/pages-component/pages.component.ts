import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../core';

@Component({
  selector: 'ncri-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() {
  }

}
