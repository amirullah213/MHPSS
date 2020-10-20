import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WardServiceService {

  constructor(private http: HttpClient, private router: Router) { }
  getBedManagement(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients ';
    return this.http.post(url, obj);
  }
 
}
