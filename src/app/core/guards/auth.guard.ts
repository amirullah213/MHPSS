import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../configs';

@Injectable(
  { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    let token = localStorage.getItem("userType");
    
    console.log('tokennn==',token);
    
    if (token =='1' ) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
}
