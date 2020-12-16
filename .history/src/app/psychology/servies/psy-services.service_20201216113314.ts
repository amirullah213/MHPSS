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
  
  getTodayPatinets(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'gettodaypatinets ';
    return this.http.post(url, obj);
  } 
  
}
