import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppAuthService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class MsalAuthGuard implements CanActivate {
  constructor(private readonly authService:AppAuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isAuthenticated() ? true : false;
  }

}
