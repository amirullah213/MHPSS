import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PharmacyServicesService {

  constructor(private http: HttpClient, private router: Router) { }
  getPharmaData(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients';
    return this.http.post(url, obj);
  }
  getPatData(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpharmpatient';
    return this.http.post(url, obj);
  }
  issueMedic(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'issuemedicine';
    return this.http.post(url, obj);
  }
  getPrescription(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getopdticket ';
    return this.http.post(url, obj);
  }
  getMidicines(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getmedicines ';
    return this.http.post(url, obj);
  }
  addNewGRN(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addgrn';
    return this.http.post(url, obj);
  }
  getPharmacies(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpharmacies ';
    return this.http.post(url, obj);
  }
   
  getPharmaStock(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpharmacystock  ';
    return this.http.post(url, obj);
  }
  issueStock(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'issuestock   ';
    return this.http.post(url, obj);
  }
  getSyncDataMerf(obj: any) {
    let url = APP_CONFIG.apiBaseUrlOnline + 'getmerfdataforlocalsync';
    return this.http.post(url, obj);
  }
  inserpurchaseOrders(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'insertpurchaseorders';
    return this.http.post(url, obj);
  }
}
