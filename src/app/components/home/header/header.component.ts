import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { Router } from '@angular/router';
import { CarRegistrationComponent } from '../car-registration/car-registration.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string = "";
  constructor(public dialog: MatDialog,private route:Router) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("userName") as string;
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserProfileComponent, {restoreFocus: false});
  }
  openCarRegister(){
    this.route.navigate(['/home/car-register']);
    
  }
  listCar(){
    this.route.navigate(['/home/car-list']);
    
  }
  logOut() {
    localStorage.removeItem('AuthToken');
    this.route.navigate(["/login/login-user"]);
  }
  carInfo() {

    this.route.navigate(["/home/carInfo"]);

  }
}
