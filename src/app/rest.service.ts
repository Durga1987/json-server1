import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {employees} from './employees';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  url : string = "http://localhost:3004/employees";
  errorURL:string = "http://localhost:9000/";
  constructor(private http: HttpClient) { }
    getUsers() {
      return this.http.get<employees[]>(this.url);
  }
  saveUser(data):Observable<any> {
   return  this.http.post(this.url , (data));
    }
   saveError(data):Observable<any> {
     console.log(data);
     const data1 =  {'message':data}
    return  this.http.post(this.errorURL+'api/saveError' , (data1));
  }
  
}
