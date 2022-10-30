import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CarRegistrationComponent } from './car-registration/car-registration.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { CarService } from './services/car.service';
import { HeaderComponent } from './header/header.component';
import { DealerCarListComponent } from './dealer-car-list/dealer-car-list.component';
import { CarListService } from './services/car-list.service';
import { CarInfoComponent } from './car-info/car-info.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component';
import { DealerDashboardComponent, MY_FORMATS } from './dealer-dashboard/dealer-dashboard.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CarRegistrationComponent,
    HeaderComponent,
    DealerCarListComponent,
    CarInfoComponent,
    MenuComponent,
    DealerDashboardComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatFormField,
    MatCardModule,
    MatDividerModule
  ],
  providers: [
    CarService,CarListService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      // deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    
  ]
 
})
export class HomeModule { }
