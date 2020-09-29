import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core/configs';

@Injectable({providedIn: 'any'})
export class AccountSettingService {

  constructor(private http: HttpClient) { }

  // update password
  changePassword(obj:any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/ChangePassword/';
    return this.http.post(url,obj);
}

changeEmail(obj:any): Observable<any>{
  let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/ChangeEmail/';
  return this.http.post(url,obj);
}

deactivateAccount(): Observable<any>{
  let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/DeactivateAccount/';
  return this.http.get(url);
}

  
}
