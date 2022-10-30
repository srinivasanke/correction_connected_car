import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  showEmailVerification = false;
  constructor() { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.showEmailVerification = true;

  }
}
