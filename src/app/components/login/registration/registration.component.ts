import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.minLength(8),Validators.required]],
      reEnterPassword: ['',[Validators.minLength(8),Validators.required]]
    });
  }

  registerUser() {
    this.loginService.setUserInfo(this.registrationForm.value);
    this.router.navigate(["/login/on-board"]);
  }

}
