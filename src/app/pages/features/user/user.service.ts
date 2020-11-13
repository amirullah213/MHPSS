import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router,) {}


  getclinicalinfo(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getclinicalinfo';
    return this.http.post(url, obj);
  }
  getInvistigation(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getinvestigations';
    return this.http.post(url, obj);
  }


  gettreatmentdata(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'gettreatmentdata';
    return this.http.post(url, obj);
  }
  addclinicalinfo(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'addclinicalinfo';
    return this.http.post(url, obj);
  }

  addinvestigation(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'addinvestigation';
    return this.http.post(url, obj);
  } 
  deleteprescriptiontest(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'deleteprescriptiontest';
    return this.http.post(url, obj);
  }
  generatetoken(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'generatetoken';
    return this.http.post(url, obj);
  }


  getindoorlist(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'getindoorlist';
    return this.http.post(url, obj);
  } 
  addtreatmentinfo(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'addtreatmentinfo';
    return this.http.post(url, obj);
  }
  

  updatepatienttoken(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'updatepatienttoken';
    return this.http.post(url, obj);
  }
  

  reffer(obj :any):Observable<any>
  {
    let url = APP_CONFIG.apiBaseUrl + 'reffer';
    return this.http.post(url, obj);
  }
  
  getOpdTicket(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getopdticket';
    return this.http.post(url, obj);
  }
  
  
  userList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients';
    return this.http.post(url, obj);
  }

  getPatPrescription(obj: any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'getpatientprescriptions';
    return this.http.post(url, obj);
  }

  changeLogo(obj: any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'changeLogo';
    return this.http.post(url, obj);
  }

  getLogo(): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'getLogo';
    return this.http.get(url);
  }
  updatePassword(obj: any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'updatePassword';
    return this.http.post(url, obj);
  }

  editUser(obj: any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'updatePassword';
    return this.http.post(url, obj);
  }

  createUser(obj: any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'updatePassword';
    return this.http.post(url, obj);
  }
  gettestImages  (obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'gettestimages';
    return this.http.post(url, obj);
  } 
  
  
}
