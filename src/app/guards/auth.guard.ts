import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate{

  constructor(private authService:AuthService, private router: Router) {}

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<boolean|UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    console.log(this.authService.isLoggedIn());
    // return this.checkAuth();
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['forbidden']);
      return false;
    }
    return true;

  }

}