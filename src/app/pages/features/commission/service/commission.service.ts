import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../core';
import { Observable } from 'rxjs';

@Injectable()
export class CommissionService {
    constructor(private httpClient: HttpClient) { }

    getCurrencyCode(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/CurrencyCodeDropdownList/';
        return this.httpClient.get(url);
    }

    addCompensation(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AddCommissionCompensation/';
        return this.httpClient.post(url, obj);
    }

    addBreakEven(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AddBreakEvenPoint/';
        return this.httpClient.post(url, obj);
    }

    deleteBreakEven(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/DeleteBreakEvenPoint/';
        return this.httpClient.post(url, obj);
    }

    updateBreakEven(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/EditBreakEvenPoint/';
        return this.httpClient.post(url, obj);
    }
    
}