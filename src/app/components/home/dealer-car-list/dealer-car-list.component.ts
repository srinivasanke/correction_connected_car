import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MAT_SORT_DEFAULT_OPTIONS } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CarListService } from '../services/car-list.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';


export interface carList {
  carId:number;
  modelName: string;
  vin: string;
  registrationNumber: string;
  dongleId:string;
  soldOn: Date;
  
}
const carData: carList[] =  [];

@Component({
  selector: 'app-dealer-car-list',
  templateUrl: './dealer-car-list.component.html',
  styleUrls: ['./dealer-car-list.component.css']
})
export class DealerCarListComponent implements OnInit {
  displayedColumns: string[] = ['carId','modelName', 'vin', 'registrationNumber', 'dongleId','soldOn'];
  dataSource = new MatTableDataSource<carList>(carData);
  pipe: DatePipe | undefined;
  // filterData:Date | undefined;
  // filterDates:boolean = false;
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});
  filterDate = new MatTableDataSource<carList> (carData);

get fromDateVal() { 
  return this.filterForm.get('fromDate')?.value;
}

get toDateVal() {
   return this.filterForm.get('toDate')?.value;
   }

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private route:Router,private allCar: CarListService) {
    this.allCar.getCar().subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data.cars);
      // this.filterDate = new MatTableDataSource(res.data.cars.soldOn);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(res);
      // console.log(this.dataSource);
  })
  // this.pipe = new DatePipe('en');
  // this.dataSource.filterPredicate = (data) =>{
  //   if (this.fromDate && this.toDate) {
  //     return data.soldOn >= this.fromDate && data.soldOn <= this.toDate;
  //   }
  //   return true;
  // }
    }
    
  ngOnInit(): void {
    // this.data(this.filterDates)
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data, filter) =>{
      if (this.fromDateVal && this.toDateVal) {
        return data.soldOn >= this.fromDateVal && data.soldOn <= this.toDateVal;
      }
      return true;
    }
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
  }
  openCarRegister(){
    this.route.navigate(['/home/car-register']);
    
  }
  applyDateFilter() {
    // this.dataSource.filter = "2005-05-12";
    // console.log(this.fromDate._i)
    // console.log(this.filterForm.value);
    this.dataSource.filter = JSON.stringify(this.fromDateVal, this.toDateVal);
    this.dataSource.data =this.dataSource.data.filter(e=> e.soldOn >= this.filterForm.value.fromDate && e.soldOn <= this.filterForm.value.toDate);
   console.log(this.dataSource.filter )
  }

  
  // applyDateFilter() {
    // this.dataSource.data = carData;
    // console.log("car",this.dataSource.filteredData)
    // const fromDate = this.filterForm.get('fromDate')?.value;
    // const toDate = this.filterForm.get('toDate')?.value;
    // this.dataSource.filteredData = this.dataSource.filteredData.filter(e=>e.soldOn > fromDate.value && e.soldOn < toDate.value ) ;
    // this.filterForm.value.fromDate
    // this.filterDates = true
    // this.dataSource.filterPredicate = (data) =>{
    //   if (this.filterDates = true) {
    //     return data.soldOn >= this.fromDate && data.soldOn <= this.toDate;
    //   }
    //   return true;
    // }
    // console.log(this.filterForm.value)
  // }
// data(dateFilter:any){
//   this.allCar.getCar().subscribe(res => {
//     this.dataSource = new MatTableDataSource(res.data.cars);
//     // this.filterDate = new MatTableDataSource(res.data.cars.soldOn);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//     // console.log(res);
//     console.log(this.dataSource.filteredData[0].soldOn);
// })
// }
}


