import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {
  notMenuBar = true;
  helper = new JwtHelperService();
  decodedToken: any;
  authToken = localStorage.getItem('AuthToken');
  uuid: any;
  carList: any[] = [];
  carId!: number;
  modelName: any;
  registrationNumber: any;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.carShow();
  }

  carShow() {
    if (this.authToken != null) {
      this.decodedToken = this.helper.decodeToken(this.authToken);
      this.uuid = this.decodedToken.uuid;
      console.log(this.uuid);
    }
    else {
      this.router.navigate(["/login/login-user"]);
    }

    this.homeService.carList(this.uuid).subscribe((resp) => {
      console.log(resp);
      if (resp.message = "Fetch car successfully") {
        this.carList = resp.data.cars;
        console.log(this.carList);
      }
    });
  }
  carInfo(carList: any) {
    console.log(carList);
    this.carId = carList.carId;
    this.modelName = carList.modelName;
    this.registrationNumber = carList.registrationNumber;
  }
}
