import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  userName:string = "";
 
 

  @Input() notMenuBar = false;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("userName") as string;
    

  }

  openDialog() {
    const dialogRef = this.dialog.open(UserProfileComponent, { restoreFocus: false });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    //  dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  carInfo() {
    this.router.navigate(["/home/carInfo"]);
  }

  logOut() {
    localStorage.removeItem('AuthToken');
    this.router.navigate(["/login/login-user"]);
  }

  openCarRegister(){
    this.router.navigate(['/home/car-register']);
    
  }
  listCar(){
    this.router.navigate(['/home/car-list']);
    
  }
}


