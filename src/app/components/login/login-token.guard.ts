import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginTokenGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate() {
    const currentUser = this.loginService.isLoggedIn();
    const timeOut = this.loginService.isValidToken();
    if (currentUser && timeOut) {
      return true;
    }
    else {
      this.router.navigate(["/login/login-user"]);
      return false;
    }
  }
}
