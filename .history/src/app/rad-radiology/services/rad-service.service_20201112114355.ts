import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RadServiceService {
  constructor(private http: HttpClient, private router: Router) { }
  getPatsListPending(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpendinglaboratorypatients  ';
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
  uploadImage (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'uploadimage  ';
    return this.http.post(url, obj);
  } 

}

