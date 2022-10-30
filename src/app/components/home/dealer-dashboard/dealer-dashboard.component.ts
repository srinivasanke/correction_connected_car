import { Component, Injectable, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDateRangeSelectionStrategy,DateRange,MAT_DATE_RANGE_SELECTION_STRATEGY,} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
 parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dealer-dashboard',
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.css']
})

export class DealerDashboardComponent implements OnInit {
  month:boolean = true;
  year:boolean = false;
  custom:boolean = false;
  totalCarRegistered:any; 
  totalCarServiced:any;

  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor() { }
  ngOnInit(): void {
    this.totalCarRegistered = 200;
    this.totalCarServiced = 100;
  }
  months = new FormControl(moment());
  years = new FormControl(moment());

  setMonth(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.months.value!;
    ctrlValue.month(normalizedMonth.month());
    // ctrlValue.year(normalizedMonthAndYear.year());
    this.months.setValue(ctrlValue);
    console.log(normalizedMonth);
    console.log(datepicker)
    datepicker.close();
  }
  setYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.years.value!;
    // ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedYear.year());
    this.years.setValue(ctrlValue);
    datepicker.close();
  }
  onSelectMonth(){
    this.month = true;
    this.year = false;
    this.custom = false;
  }
  onSelectYear(){
    this.year = true;
    this.month = false;
    this.custom = false;
  }
  onSelectCustom(){
    this.year = false;
    this.month = false;
    this.custom = true;
  }
  
}
  


