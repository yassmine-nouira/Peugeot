import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class KilometrageService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url +
      "/api/kilometrage/add",data,{
        headers:new HttpHeaders().set('enctype',"multipart/form-data")
      });
  }


  update(data:any){
    return this.httpClient.post(this.url +
      "/api/kilometrage/update" + data.id ,data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  getKilometrageById(id:any){
    return this.httpClient.post(this.url +
      "/api/kilometrage/get" + id ,{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }


  getKilometrages(){
    return this.httpClient.get(this.url + "/api/kilometrage/get");
  }
 


  delete(id:any){
    return this.httpClient.delete(this.url +
      "/api/kilometrage/delete/" + id ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


}
