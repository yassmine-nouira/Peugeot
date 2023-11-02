import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModeleVehiculeService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url +
      "/api/modeleVehicule/add",data,{
        headers:new HttpHeaders().set('enctype',"multipart/form-data")
      });
  }


  update(data:any){
    return this.httpClient.post(this.url +
      "/api/modeleVehicule/update" + data.id ,data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  getMVById(id:any){
    return this.httpClient.post(this.url +
      "/api/modeleVehicule/get" + id ,{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }


  getMVs(){
    return this.httpClient.get(this.url + "/api/modeleVehicule/get");
  }
 


  delete(id:any){
    return this.httpClient.delete(this.url +
      "/api/modeleVehicule/delete/" + id ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


}
