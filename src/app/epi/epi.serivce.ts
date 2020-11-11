import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../core';

@Injectable({
  providedIn: 'root'
})
export class epiService {
 

  constructor(private http: HttpClient, private router: Router,) {}


  getchildrenepischedule(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getchildrenepischedule';
    return this.http.post(url, obj);
  }
 
  addchildrenepischedule(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'addchildrenepischedule';
    return this.http.post(url, obj);
  }
  updatechildrenepischedule(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'updatechildrenepischedule';
    return this.http.post(url, obj);
  }
 
  
}
