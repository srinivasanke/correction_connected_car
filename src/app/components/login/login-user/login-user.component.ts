import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  invalidUserMsg: string = "";
  constructor(private router: Router, private loginService: LoginService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.invalidUserMsg = "";
    });
  }

  loginUser() {
    this.loginService.loginUser(this.loginForm?.value).subscribe((resp) => {
      this.router.navigate(["/login/otp"]);
      this.invalidUserMsg = "";
      sessionStorage.setItem("userName", resp.data.firstName);
    },
      (err) => {
        this.invalidUserMsg = err?.error?.message ? err?.error.message : "";
      });
  }
}
