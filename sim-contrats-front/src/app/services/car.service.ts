import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url +
      "/api/v1/car/add",data,{
        headers:new HttpHeaders().set('enctype',"multipart/form-data")
      });
  }


  update(data:any){
    return this.httpClient.post(this.url +
      "/api/v1/car/update",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  getCars(){
    return this.httpClient.get(this.url + "/api/v1/car/get");
  }


  updateStatus(data:any){
    return this.httpClient.post(this.url +
      "/api/v1/car/update/status",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  delete(id:any){
    return this.httpClient.delete(this.url +
      "/api/v1/car/delete/" + id ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }



}
