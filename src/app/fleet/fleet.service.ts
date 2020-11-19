import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from 'src/app/core'

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient, private router: Router,) {}


  getfleetpatients(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getfleetpatients';
    return this.http.post(url, obj);
  }
  getambulances(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getambulances';
    return this.http.post(url, obj);
  }

  updateambulances(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'updateambulances';
    return this.http.post(url, obj);
  }

  updatereferral(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'updatereferral';
    return this.http.post(url, obj);
  }
  
  

  
  
  
}
