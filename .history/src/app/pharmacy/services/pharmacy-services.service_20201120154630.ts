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
  updateMerfStatus(obj: any) {
    let url = APP_CONFIG.apiBaseUrlOnline + 'updatemerfposyncstatus';
    return this.http.post(url, obj);
  }
  getPendPurOrd(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpendingpurchaseorders';
    return this.http.post(url, obj);
  }
  getordeItems(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpurchaseorderitems';
    return this.http.post(url, obj);
  }
  addPharmacyGRM(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addpharmgrn';
    return this.http.post(url, obj);
  }
  addStockrequestSatelite (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addstockrequest ';
    return this.http.post(url, obj);
  }
  getStockReqs (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getstockrequests ';
    return this.http.post(url, obj);
  }
  getStockReqItms (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getstockrequestitems ';
    return this.http.post(url, obj);
  }
  addissuedStock (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addissuedstock ';
    return this.http.post(url, obj);
  }
  getIssuedStocks (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getissuedstocks ';
    return this.http.post(url, obj);
  }
  getIssuedStocksItems (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getissuedstockitems ';
    return this.http.post(url, obj);
  }
  addsatteliteGrn (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addsatellitegrn ';
    return this.http.post(url, obj);
  }
  getPharmacyStock (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpharmacystock ';
    return this.http.post(url, obj);
  }
  addDispense (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'adddispense ';
    return this.http.post(url, obj);
  }
  updatePatientToken (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updatepatienttoken ';
    return this.http.post(url, obj);
  }
  getTodayPatinets(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'gettodaypatinets ';
    return this.http.post(url, obj);
  } 
  getpendingTests(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatientpendingtest';
    return this.http.post(url, obj);
  } 

    
}
