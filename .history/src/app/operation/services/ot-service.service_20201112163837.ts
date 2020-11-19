import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OtServiceService {
  constructor(private http: HttpClient, private router: Router) { }
  getPatList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients   ';
    return this.http.post(url, obj);
  } 
  getpendingTests(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatientpendingtest';
    return this.http.post(url, obj);
  } 
  updateTests(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updattest ';
    return this.http.post(url, obj);
  } 
  getOperationTheatre(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getoperationtheatre ';
    return this.http.post(url, obj);
  } 

  updateOperationTheatre (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updateoperationtheatre  ';
    return this.http.post(url, obj);
  }
  getIndoorList (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getindoorlist  ';
    return this.http.post(url, obj);
  }
  getIndoorDiagnosis (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getindoordiagnosis';
    return this.http.post(url, obj);
  }
  
   
}