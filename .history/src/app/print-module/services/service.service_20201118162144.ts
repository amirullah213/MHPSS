import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient, private router: Router) { }
  getprescription(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getopdticket';
    return this.http.post(url, obj);
  }
  getPatData(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpharmpatient';
    return this.http.post(url, obj);
  }
}
