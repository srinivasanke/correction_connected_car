import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  carList(inputdata: any): Observable<any> {
    var authToken = localStorage.getItem('AuthToken') || '';
    var headers_object = new HttpHeaders({
      "Content-Type": 'application/json',
      "X-Auth-Token": authToken,
    })

    const httpOptions = {
      headers: headers_object
    };

    let url = `${environment.apiUrl}api/v1/user/uuid/` + inputdata;
    return this.httpClient.get(url, httpOptions);
  }
}


