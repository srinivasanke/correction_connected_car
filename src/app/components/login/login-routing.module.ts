import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardUserComponent } from './onboard-user/onboard-user.component';
import { RegistrationDealerComponent } from './registration-dealer/registration-dealer.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogInComponent } from './log-in/log-in.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-user',
    pathMatch: 'prefix'
  },
  {
    path: 'login-user',
    component: LogInComponent
  },
  {
    path: 'user-registration',
    component: RegistrationDealerComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'on-board',
    component: OnboardUserComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
