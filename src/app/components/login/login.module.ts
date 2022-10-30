import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationComponent } from './registration/registration.component';
import { OnboardUserComponent } from './onboard-user/onboard-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegistrationDealerComponent } from './registration-dealer/registration-dealer.component';
import { LogInComponent } from './log-in/log-in.component';


@NgModule({
  declarations: [
    LoginUserComponent,
    RegistrationComponent,
    OnboardUserComponent,
    ResetPasswordComponent,
    RegistrationDealerComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule
  ]
})
export class LoginModule { }
