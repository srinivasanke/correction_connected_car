import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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
