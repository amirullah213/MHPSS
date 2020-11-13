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
  userlogin(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'userlogin';
    return this.http.post(url, obj);
  }
  getindoorlist(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getindoorlist';
    return this.http.post(url, obj);
  }
  userList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getpatients';
    return this.http.post(url, obj);
  }

  getPatPrescription(obj: any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + 'getpatientprescriptions';
    return this.http.post(url, obj);
  }

  getOpdTicket(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getopdticket';
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
    localStorage.setItem('details', JSON.stringify(resp) );

    localStorage.removeItem('tab');
    localStorage.setItem('userType', resp.userType);
    localStorage.setItem('hospitalID', resp.hospitalID);
    localStorage.setItem('docId', resp.id);
    localStorage.setItem('indoorID', resp.indoorID);
  
    //-----------testing routs
    // if(resp==1){ this.router.navigate(['/doctor'])};
    // if(resp==2){ this.router.navigate(['/lab-path'])}
    // if(resp==3){ this.router.navigate(['/reception'])}
    // if(resp==4 || resp==44 || resp==444 ){ this.router.navigate(['/radiology'])}
    //-----------testing routs  
    
    if(resp.userType==1){ this.router.navigate(['/docsignin'])};
    if(resp.userType==2){ this.router.navigate(['/lab-path'])}
    if(resp.userType==3){ this.router.navigate(['/reception'])}
    if(resp.userType==4 || resp.userType==44 || resp.userType==444 ){ this.router.navigate(['/lab-rad'])}
    if(resp.userType==5){ this.router.navigate(['/ward-list'])}
    if(resp.userType==6){ this.router.navigate(['/obs-reg'])}
    if(resp.userType==7){ this.router.navigate(['/ot'])}
    if(resp.userType==8){ this.router.navigate(['/pharma'])}
    if(resp.userType==9){ this.router.navigate(['/community'])}
    if(resp.userType==10){ this.router.navigate(['/fac-staff'])}
    if(resp.userType==11){ this.router.navigate(['/admin'])}
    if(resp.userType==12) { this.router.navigate(['/docsignin'])}
    if (resp.userType == 555) { this.router.navigate(['/vitals']) }
    if (resp.userType == 13) { this.router.navigate(['/fleet']) }
  
    // this.router.navigate(['/dashboard']);
  }

 
}
