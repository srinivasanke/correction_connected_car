import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MAT_SORT_DEFAULT_OPTIONS } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CarListService } from '../services/car-list.service';
import { DatePipe } from '@angular/common';
import { NativeDateAdapter } from '@angular/material/core';
import {carListConstants} from '../dealer-car-list/car-list'
import moment from 'moment'
import { FormGroup, FormControl,ReactiveFormsModule, Validators } from '@angular/forms';





@Component({
  selector: 'app-dealer-car-list',
  templateUrl: './dealer-car-list.component.html',
  styleUrls: ['./dealer-car-list.component.css']
})

export class DealerCarListComponent implements OnInit {
  displayedColumns: string[] = ['carId','modelName', 'vin', 'registrationNumber', 'dongleId','soldOn'];
  
  pipe: DatePipe | undefined;
  filterData: any = [];
  travelersData: any = [];
  finalData: any = [];
  search: any = { query: ''};
  filterForm!: FormGroup;

get fromDateVal() { 
  return this.filterForm.get('fromDate')?.value;
}

get toDateVal() {
   return this.filterForm.get('toDate')?.value;
   }

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private route:Router,private allCar: CarListService) {
    }
    
  ngOnInit(): void {
    this.filterForm = new FormGroup(
      {
        fromDate: new FormControl('', [Validators.required]),
        toDate: new FormControl('', [Validators.required]),
        searchData : new FormControl('', [Validators.required]),
      }
    );
    // this.data(this.filterDates)
    const data: any = carListConstants.carData;
    this.travelersData = [...data];
    this.filterData = [...data];
    this.finalData = [...this.filterData];
    console.log(this.finalData);
    }
  reverseAndTimeStamp(dateString: string) {
    const reverse = new Date(dateString.split("-").reverse().join("-"));
    return reverse.getTime();
    }

  searchCars(): void { 
    this.filterData = this.travelersData.filter((item: any) => {
       if (JSON.stringify(this.filterForm.value.searchData && JSON.stringify(this.toDateVal) && JSON.stringify(this.fromDateVal))) {
        return (this.filterByDate(item) && this.filterByName(item));
      } 
    });
    this.filterData = this.filterData

  }

  
  filterByDate(item: any): any {
    
     let fromDate = moment(this.fromDateVal).format('DD-MM-YYYY');
     let toDate = moment(this.toDateVal).format('DD-MM-YYYY');
      return this.reverseAndTimeStamp(item.soldOn) >= this.reverseAndTimeStamp(fromDate) && this.reverseAndTimeStamp(item.soldOn) <= this.reverseAndTimeStamp(toDate)


  }

  filterByName(item: any): any {
    return item.modelName.toLowerCase() === this.filterForm.value.searchData.toLowerCase();
    
  }

  openCarRegister(){
    this.route.navigate(['/home/car-register']);
    
  }
 

}
export interface carList {
  carId:number;
  modelName: string;
  vin: string;
  registrationNumber: string;
  dongleId:string;
  soldOn: any;
  
}
