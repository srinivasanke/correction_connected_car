import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registration-dealer',
  templateUrl: './registration-dealer.component.html',
  styleUrls: ['./registration-dealer.component.css'],
  
})

export class RegistrationDealerComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  
  constructor(
    private router:Router, 
    private fb: FormBuilder,
    private loginService:LoginService  
  ) { }
  selectedValue: string='';
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      lastName:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      email: ['',[Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),Validators.required]],
      mobileNumber:['',[Validators.pattern('^[0-9]{10}$'),Validators.required]],
      addressLine1:['',[Validators.required]],
      addressLine2:['',],
      city:['',],
      state:['',],
      country:['',],
      zipCode:['',[Validators.pattern('^[0-9]{6}$'),Validators.required]],
      userType:['',Validators.required]
    });
  }
  users:any=['owner','dealer']
  message:string='';
  registerUser() {
    this.loginService.userRegistration(this.registrationForm.value).subscribe(
      (response)=>{
        this.message=response.message,
        
      setTimeout(()=>{
        this.message=''
      },8000)
      setTimeout(()=>{    
        this.router.navigate(["/login"]);
      },10000)
      },
      (errors)=>{
        this.message=errors.error.message,
       

        setTimeout(() => {
          this.message='';
        }, 10000);
      }
    );
  
  }
}
