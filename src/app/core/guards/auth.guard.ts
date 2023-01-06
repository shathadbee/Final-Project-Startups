import { Injectable } from '@angular/core';
import {  CanLoad, Route,  Router,  UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad{
  constructor(private _authService:AuthService, private router: Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean  {
    const isLoggedIn=this._authService.isLoggedIn;
  if(isLoggedIn){
    return true;
  }
  this.router.navigate(['/home']);
  return false;
  }


}
