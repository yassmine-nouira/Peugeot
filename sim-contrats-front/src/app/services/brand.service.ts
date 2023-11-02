import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';



@Injectable({
 
  providedIn: 'root'
})
export class BrandService {

  url = environment.apiUrl; 
  constructor(private httpClient:HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url +
      "/api/v1/brand/add",data,{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }


  update(data:any){
    return this.httpClient.post(this.url +
      "/api/v1/brand/update",data,{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }


  getBrands(){
    return this.httpClient.get(this.url + "/api/v1/brand/get");
  }



}
