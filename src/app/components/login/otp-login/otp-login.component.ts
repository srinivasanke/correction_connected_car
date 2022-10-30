import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.css']
})

export class OtpLoginComponent implements OnInit {

  @Input() txId: any;
  @Input() email: any;
  AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNWU1ZTBhMi1lZGExLTQxNWMtYjY2OS1lODA2ZjE3YzFmMDEiLCJpYXQiOjE2NjU1Njk4MjAsImV4cCI6MTY2NTUzMDIyMCwiaXNzIjoiaHR0cHM6Ly9jYy5zYXNrZW4uaW4vIiwidXNlcklkIjoiZW1haWxJZE9mVXNlckB0ZXN0LmNvbSIsInJvbGUiOiJvd25lciJ9.fB_keoicXmLTzrvF6dJCLoTjfe980upy3nqrSapBN-0"
  otpValue: FormGroup = new FormGroup({});
  invalidUserMsg: string = "";
  num: any;
  otp!: number;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  constructor(private router: Router, private snackBar: MatSnackBar, private loginService: LoginService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    // localStorage.setItem('AuthToken', this.AuthToken);
    this.otpValue = this.fb.group({
      otp: ['', Validators.required],
    });
    this.otpValue.valueChanges.subscribe(() => {
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

  loginOtp() {
    this.otp = parseInt(this.num);
    if (this.otp.toString().length < this.configOptions.length) {
      this.snackBar.open("Please enter all digits.", 'OK', {
        duration: 3000,
      });
    }
    else {
      console.log(this.otp);
      // console.log(this.otpValue.value.otp);
      console.log(this.txId);
      console.log(this.email);

      // let params = { otp: this.otpValue.value.otp, txId: this.txId, email: this.email }
      let params = { otp: this.otp, txId: this.txId, email: this.email }

      this.loginService.otpValidate(params).subscribe((resp) => {
        console.log(resp);
        this.invalidUserMsg = "";
        if (resp.status == "Success") {
          this.snackBar.open(resp.message, 'OK', {
            duration: 3000,
          });
          localStorage.setItem('AuthToken', this.AuthToken);
          this.loginService.isValidToken();
          this.router.navigate(["/home/dashboard"]);
        }
      },
        (err) => {
          // this.invalidUserMsg = err?.error?.message ? err?.error.message : "";
          this.snackBar.open(err.error.message, 'OK', {
            duration: 3000,
          });
          // localStorage.setItem('AuthToken', this.AuthToken);
          // this.loginService.isValidToken();
          // this.router.navigate(["/home/dashboard"]);
        });
    }
  }
}

