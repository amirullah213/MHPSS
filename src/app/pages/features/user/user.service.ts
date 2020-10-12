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

  

  
  
  
}
