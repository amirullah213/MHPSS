import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from 'src/app/core'

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient, private router: Router,) {}


  getfleetpatients(obj: any):Observable<any> {
    let url = APP_CONFIG.apiBaseUrl + 'getfleetpatients';
    return this.http.post(url, obj);
  }
 
  

  
  
  
}
