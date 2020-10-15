import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-doctor-singin',
  templateUrl: './doctor-singin.component.html',
  styleUrls: ['./doctor-singin.component.scss']
})
export class DoctorSinginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
