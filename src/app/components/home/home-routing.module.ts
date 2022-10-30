import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarRegistrationComponent } from './car-registration/car-registration.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DealerCarListComponent } from './dealer-car-list/dealer-car-list.component';
import { LoginTokenGuard } from '../login/login-token.guard';
import { DealerDashboardComponent } from './dealer-dashboard/dealer-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'prefix'
  },
  {
    path: 'dashboard', canActivate: [LoginTokenGuard],
    component: DashboardComponent
  },
  {
    path: 'carInfo',
    component: CarInfoComponent
  },
  { path: 'car-register', component: CarRegistrationComponent },
  { path: 'car-list', component: DealerCarListComponent },
  { path: 'dealer-dashboard', component: DealerDashboardComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
