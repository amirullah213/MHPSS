import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PsyServicesService {

  constructor(private http: HttpClient, private router: Router) { }
  
  getPatients(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients';
    return this.http.post(url, obj);
  }
  getPsychological(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpsychological';
    return this.http.post(url, obj);
  }
  addPsychological(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addpsychological';
    return this.http.post(url, obj);
  }
  deletePsychological(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deletepsychological';
    return this.http.post(url, obj);
  }

  
  
}
