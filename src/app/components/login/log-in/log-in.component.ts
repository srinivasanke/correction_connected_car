import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  invalidUserMsg: string = "";
  num: any;
  otp!: number;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";
  email: any;
  txId: any;
  otpSuccess = false;
  helper = new JwtHelperService();
  decodedToken: any;
  loginForm: FormGroup = new FormGroup({});

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  constructor(private router: Router, private snackBar: MatSnackBar, private loginService: LoginService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.invalidUserMsg = "";
    });
  }

  onOtpChange(event: any) {
    this.num = event;
    if (this.num.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.num.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if (this.num.length == this.configOptions.length) {
      this.inputDigitLeft = "Let's go!";
      this.btnStatus = 'btn-primary';
    }
  }

  otpGenerate() {
    this.loginService.otpGenerate(this.loginForm?.value).subscribe((resp) => {
      this.snackBar.open("OTP sent successfully", 'OK', {
        duration: 3000,
      });
      console.log(resp);
      this.txId = resp.txId;
      this.email = resp.email;
      this.invalidUserMsg = "";
      if (resp.status == "Success") {
        this.otpSuccess = true;
      }
      console.log("OTP Sent: " + resp.otp);
      console.log(this.txId);
      console.log(this.email);
    },

      (err) => {
        this.snackBar.open(err.error.message, 'OK', {
          duration: 3000,
        });
      });
  }

  loginOtp() {
    this.otp = parseInt(this.num);
    if (this.otp.toString().length < this.configOptions.length) {
      this.snackBar.open("Please enter all digits.", 'OK', {
        duration: 3000,
      });
    }
    else {
      console.log(this.otp);
      console.log(this.txId);
      console.log(this.email);

      let params = { otp: this.otp, txId: this.txId, email: this.email }

      this.loginService.otpValidate(params).subscribe((resp) => {
        console.log(resp);
        this.invalidUserMsg = "";
        if (resp.status == "Success") {
          this.snackBar.open(resp.message, 'OK', {
            duration: 3000,
          });
          localStorage.setItem('AuthToken', resp.token);
          let authToken = localStorage.getItem('AuthToken') || '';
          this.loginService.isValidToken();
          this.otpSuccess = false;
          this.decodedToken = this.helper.decodeToken(authToken);
          if (this.decodedToken.userType == "owner") {
            this.router.navigate(["/home/carInfo"]);
          }
          else {
            this.router.navigate(["/home/car-list"]);
          }
        }
      },
        (err) => {
          this.snackBar.open(err.error.message, 'OK', {
            duration: 3000,
          });
        });
    }
  }
}
