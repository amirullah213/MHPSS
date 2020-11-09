import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../core';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {
 

  constructor(private http: HttpClient, private router: Router,) {}



  addpatientvital(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'addpatientvital';
    return this.http.post(url, obj);
  }
  getallpatientvital(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getallpatientvital';
    return this.http.post(url, obj);
  }

  getpatients(obj: any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'getpatients';
    return this.http.post(url, obj);
  }
  
}
