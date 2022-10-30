import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-onboard-user',
  templateUrl: './onboard-user.component.html',
  styleUrls: ['./onboard-user.component.css']
})
export class OnboardUserComponent implements OnInit {

  onboardingForm: FormGroup = new FormGroup({});
  car: FormGroup = new FormGroup({});

  constructor(private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.car = this.fb.group({
      vin: [""],
      dongleId: [""]
    }),
      this.onboardingForm = this.fb.group({
        car: this.car,
        firstName: ["",[Validators.required]],
        email: ["",[Validators.email,Validators.required]],
        password: [""]
      });
  }

  onBoardUser() {
    this.onboardingForm.patchValue(this.loginService.getUserInfo());
    this.loginService.createUser(this.onboardingForm.value).subscribe((resp) => {
      this.router.navigate(["/login"]);
    }, (err) => {
      alert(err?.message);
    })
  }

}
