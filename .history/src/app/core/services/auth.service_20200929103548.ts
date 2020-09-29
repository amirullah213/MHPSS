import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../configs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router,) {}

  loginPms(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'loginpms';
    return this.http.post(url, obj);
  }

  getJWTToken(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ObtainJWT/';
    return this.http.post(url, obj);
  }

  forgotPassword(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ForgotPassword/';
    return this.http.post(url, obj);
  }

  forgotUsername(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ForgotUsername/';
    return this.http.post(url, obj);
  }

  forgotPasswordAction(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ForgotPasswordAction/';
    return this.http.post(url, obj);
  }

  getQRCode(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ObtainQRCode/';
    return this.http.post(url, obj);
  }

  getJWTWithQRCode(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ObtainJWTWithQRCode/';
    return this.http.post(url, obj);
  }

  setUser(resp: any) {
    console.log('resp details===',resp)
    localStorage.setItem('details', resp);
    //  localStorage.setItem('id', String(resp[0].id));
    
    if(resp.userType==0){ this.router.navigate(['/user'])};
    alert('no path matches')
    // this.router.navigate(['/dashboard']);
  }

 
}
