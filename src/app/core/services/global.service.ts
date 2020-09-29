import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { APP_CONFIG } from '../configs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  userName: string = '';
  private tokenValue: string = '';

  //clock
  private clock: Observable<Date>;
  constructor(private router: Router,private httpClient: HttpClient) {
    //setting clock observable
    // this.clock = interval(1000).pipe(
    //   map(tick => new Date()),
    //   share()
    // );
  }

  //token getter
  get token() {
    let token = localStorage.getItem("details");
    if (token !== null && JSON.parse(token).token) {
      this.tokenValue  = JSON.parse(token).token;
    }else{
      this.tokenValue  = '';
    }
    return this.tokenValue;
  }

  //returning clock
  getClock(): Observable<Date> {
    return this.clock;
  }
  logOut() {
    // remove user from local storage and route to signin page
    localStorage.removeItem('details');
    this.router.navigate(['/signin']);
}

  get email() {
    let data = localStorage.getItem('details');
    if (data === null) {
      return ""
    } else {
      data = JSON.parse(data);
      return data['user'].email;
    }
  }

}