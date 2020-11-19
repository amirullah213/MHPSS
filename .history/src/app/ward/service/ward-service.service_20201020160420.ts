import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WardServiceService {

  constructor(private http: HttpClient, private router: Router) { }
  getWardPats(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients';
    return this.http.post(url, obj);
  }
  setbeds(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'setbedspms';
    return this.http.post(url, obj);
  }
  admitPat(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'admitpatient';
    return this.http.post(url, obj);
  }
  dischargeCard(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getdischargecard ';
    return this.http.post(url, obj);
  }
   
}
