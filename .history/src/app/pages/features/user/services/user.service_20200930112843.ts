import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/core';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private httpClient: HttpClient) { }
    // Get BranchLocationDropdownList
   
    // Check UsernameAvailability
   

    // Get UsersList
    usersList(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/getpatients ';
        return this.httpClient.post(url,obj);
    }
    loginPms(obj: any) {
        let url = APP_CONFIG.apiBaseUrl + 'getpatients ';
        return this.httpClient.post(url, obj);
      }

    getUserRoles(){
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UserRoleDropdownList/';
        return this.httpClient.get(url);
    }

    downloadList(obj:any){
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/DownloadUsersList/';
        const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'text');
        return this.httpClient.post(url,obj,{headers: headers});
    }

    validateEmail(obj:any){
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EmailAvailability/';
        return this.httpClient.post(url,obj);
    }

    // update password
    updatePassword(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/ChangeDefaultPassword/';
        const headers = new HttpHeaders();
        const details = JSON.parse(localStorage.getItem('details'));
        console.log(details)
        console.log(details.token)
        headers.append('Authorization', `JWT ${details.token}`);
        return this.httpClient.post(url,obj,{headers: headers});
    }

     // activate User
     unlockUser(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UnlockAccount/';
        return this.httpClient.post(url, obj);
    }

    // activate User
    lockUser(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/LockAccount/';
        return this.httpClient.post(url, obj);
    }
     // activate User
     changeLogo(obj): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ads/AddProductLogo/';
        // const headers = new HttpHeaders();
        // headers.set('Content-Type', null);
        // headers.set('Accept', "multipart/form-data");
        // headers.set('Content-Disposition', "form-data; name=\"json\"");
        return this.httpClient.post(url,obj);
    }

    getLogo(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ads/FetchProductLogo/';
        return this.httpClient.get(url);
    }

    fetchUserByID(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/FetchUser/';
        return this.httpClient.post(url,obj);
    }
   
}