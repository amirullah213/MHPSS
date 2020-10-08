import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PathologyGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    let token = localStorage.getItem("userType");
    console.log('tokennn==',token);
    
    if (token =='2' ) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
  
}
