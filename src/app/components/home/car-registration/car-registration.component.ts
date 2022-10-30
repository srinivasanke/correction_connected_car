import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';


@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css']
})
export class CarRegistrationComponent implements OnInit {
  carRegistrationForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private carService: CarService,
    private _snackBar: MatSnackBar,public dialog: MatDialog,
    private route:Router) { }
  ngOnInit(): void {
    this.carRegistrationForm = this.fb.group({
      car: this.fb.group({
      vin: ["",Validators.required],
      dealer: ["",Validators.required],
      dealerCity: ["",Validators.required],
      modelName: ["",Validators.required],
      description: ["",Validators.required],
      registrationNumber: ["",Validators.required],
      soldOn: ["",Validators.required],
      manufactureYear: ["",Validators.required],
      dongleId: ["",Validators.required]
      }),
      user: this.fb.group({
      email: ["",Validators.required],
      password: [""],
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      mobileNumber: ["",Validators.required]
      }),
      userType: [""]
    });
  }
  usertypes = [
    {value: 'Owner', viewValue: 'Owner'}
  ];
  createCar() {
   
    this.carService.createCar(this.carRegistrationForm.value).subscribe((resp) => {
      this._snackBar.open("Registered Successful");
      this.route.navigate(['/home/car-list']);
    },
    (err)=>{
      this._snackBar.open(err.error.code);
       });
  }
  resetForm() {
    this.carRegistrationForm.reset();
  }
  cancel(){
    this.route.navigate(['/home/car-list']);
  }
}
