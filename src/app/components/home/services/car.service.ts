import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
 

  constructor(private httpClient: HttpClient) { }

  createCar(inputData: any): Observable<any> {
var token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJNYWhlc2giLCJpc3MiOiJhdXRoMCIsImVtYWlsSWQiOiJtYWhlc2guMTBAZ21haWwuY29tIiwiZXhwIjoxNjY0MzYwODkwLCJ1dWlkIjoiZ2c4NTUwZjY2In0.uSbFActvZUqw2Ddxq8aupd1SZC4SEXfXLjjTgcZ7P9I"
    var headers_object = new HttpHeaders({
     "Content-Type":'application/json',
     'X-Auth-Token': token,
    });
 
    const httpOptions = {
     headers: headers_object
    };
    let url = `${environment.apiUrl}api/v1/addCar`;
    return this.httpClient.post(url, inputData, httpOptions);
 
  }
  
}
