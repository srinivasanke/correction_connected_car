import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarListService {

  constructor(private httpClient: HttpClient) { }
;
  
  getCar(): Observable<any> {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJsYXRlc3RtYWlsMiIsImlzcyI6ImF1dGgwIiwiZW1haWxJZCI6ImxhdGVzdG1haWwyQGdtYWlsLmNvbSIsImV4cCI6MTY1NTQ3MTczOCwidXNlcklkIjoiMyJ9.iB88TPRIdWK7yJBk0T1C6Rf-MLrjB2KbZfF3I6IGi4s"
    var headers_object = new HttpHeaders({
     "Content-Type":'application/json',
     'X-Auth-Token': token,
    });
 
    const httpOptions = {
     headers: headers_object
    };
    let url = `${environment.apiUrl}api/v1/getAllCars`
    return this.httpClient.get(url,httpOptions);
      }
}
