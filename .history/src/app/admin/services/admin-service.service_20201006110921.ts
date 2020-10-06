import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient, private router: Router,) { }

  getPatList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getallusers';
    return this.http.post(url, obj);
  }
}
