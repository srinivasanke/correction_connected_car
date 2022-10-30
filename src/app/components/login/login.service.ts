import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from "@auth0/angular-jwt";

import { MatSnackBarModule } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  email: string = "";
  otp!: number;
  helper = new JwtHelperService();
  decodedToken: any;

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  loginUser(inputData: any): Observable<any> {
    let url = `${environment.apiUrl}api/v1/user/login`;
    return this.httpClient.post(url, inputData);
  }

  otpGenerate(inputData: any): Observable<any> {
    let url = `${environment.apiUrl}api/v1/otp/generate`;
    return this.httpClient.post(url, inputData);
  }

  isLoggedIn() {
    return localStorage.getItem('AuthToken') != null;
  }

  isValidToken() {
    let authToken = localStorage.getItem('AuthToken');
    if (authToken != null) {
      this.decodedToken = this.helper.decodeToken(authToken);
      console.log(this.decodedToken.exp);
      const date = new Date();
      const expiry = this.decodedToken.exp * 1000
      const timeout = expiry - date.getTime();
      console.log(expiry);
      console.log(date.getTime());
      console.log(timeout);
      if (expiry > date.getTime()) {
        console.log("Token is Valid");
        return true;
      }
      else {
        this.snackBar.open("Token Expired, Login again", 'OK', {
          duration: 3000,
        });
        this.router.navigate(["/login/login-user"]);
        return false;
      }
    }
    else {
      this.snackBar.open("Please login again", 'OK', {
        duration: 3000,
      });
      return false;
    }
  }

  otpValidate(inputData: any): Observable<any> {
    let url = `${environment.apiUrl}api/v1/otp/validate`;
    return this.httpClient.post(url, inputData);
  }

  createUser(inputData: any): Observable<any> {
    let url = `${environment.apiUrl}api/v1/user`;
    return this.httpClient.post(url, inputData);
  }

  userRegistration(inputData: any): Observable<any> {
    let url = `${environment.apiUrl}api/v1/register/user`;
    return this.httpClient.post(url, inputData);
  }


  setUserInfo(userInfo: any) {
    this.email = userInfo.email;
  }

  getUserInfo() {
    return {
      email: this.email,

    }
  }

}
