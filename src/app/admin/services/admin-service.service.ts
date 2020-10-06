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
  addUser(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'adduser';
    return this.http.post(url, obj);
  }
  updateUser(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updateuser';
    return this.http.post(url, obj);
  }
  deleteUser(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deleteuser';
    return this.http.post(url, obj);
  }
}
