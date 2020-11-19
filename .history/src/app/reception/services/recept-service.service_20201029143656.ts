import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReceptServiceService {

  constructor(private http: HttpClient, private router: Router) { }
  searchBycnic(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatientbycnic ';
    return this.http.post(url, obj);
  }
  searchByTokenPMS(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatientpms ';
    return this.http.post(url, obj);
  }
  insertpatientpms(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'insertpatientpms ';
    return this.http.post(url, obj);
  }
  getDists(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getdistricts ';
    return this.http.post(url, obj);
  }
  gettehsil(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'gettehsils ';
    return this.http.post(url, obj);
  }
  getUC(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getucs ';
    return this.http.post(url, obj);
  } 
   
   
}
