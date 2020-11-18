import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabourRoomSerivce {

  constructor(private http: HttpClient, private router: Router,) {}


  getpatients(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients';
    return this.http.post(url, obj);
  }
  admitobstetric(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'admitobstetric';
    return this.http.post(url, obj);
  }
  getobstetric(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getobstetric';
    return this.http.post(url, obj);
  }
  updateobstetric(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'updateobstetric';
    return this.http.post(url, obj);
  }
  dischargeobstetric(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'dischargeobstetric';
    return this.http.post(url, obj);
  }
  listNatureOfDelivery(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'listNatureOfDelivery';
    return this.http.post(url, obj);
  }

  listNeonatalDeath(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'listNeonatalDeath';
    return this.http.post(url, obj);
  }
  getindoorlist(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getindoorlist';
    return this.http.post(url, obj);
  }

  generatetoken(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'generatetoken';
    return this.http.post(url, obj);
  }
  getindoordiagnosis(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getindoordiagnosis';
    return this.http.post(url, obj);
  }
  
  
  
  
}
