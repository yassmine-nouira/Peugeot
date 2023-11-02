import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url +
      "/api/contrat/add",data,{
        headers:new HttpHeaders().set('enctype',"multipart/form-data")
      });
  }


  update(data:any){
    return this.httpClient.put(this.url +
      "/api/contrat/update/" + data.id ,data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }



  getContratById(id:any){
    return this.httpClient.get(this.url +
      "/api/contrat/get" + id ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  getContrat(){
    return this.httpClient.get(this.url + "/api/contrat/get");
  }




  delete(id:any){
    return this.httpClient.delete(this.url +
      "/api/contrat/delete/" + id ,{
        headers:new HttpHeaders().set('Content-Type',"application/json; charset=utf-8; text/plain")
      });
  }



  
  getModeleV(){
    return this.httpClient.get(this.url + "/api/contrat/get/modelev");
  }


  getType(data:any){ 
    return this.httpClient.get(this.url + "/api/contrat/get/type/"+ data ,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  getDureeGarantie(modele:any,type:any){
    return this.httpClient.get(this.url +
      "/api/contrat/get/dureeGarantie/" + modele + "/" + type ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  getKm(modele:any,type:any,dureeGarantie:any){
    return this.httpClient.get(this.url +
      "/api/contrat/get/km/"  +  modele + "/" + type+ "/" + dureeGarantie  ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }



  getPUHT(modele:any,type:any,dureeGarantie:any,km:any){
    return this.httpClient.get(this.url +
      "/api/contrat/get/puhts/" +  modele + "/" + type+ "/" + dureeGarantie  + "/" +km ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }

  getPUTTC(modele:any,type:any,dureeGarantie:any,km:any){
    return this.httpClient.get(this.url +
      "/api/contrat/get/puttc/" +  modele + "/" + type+ "/" + dureeGarantie + "/" +km ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  updateStatus(data:any){
    return this.httpClient.post(this.url +
      "/api/contrat/update/status",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  exceltodatabse(data:FormData){
    return this.httpClient.post(this.url +
      "/api/contrat/exceltodatabse",data)
  }


  getNBcontrat(){
    return this.httpClient.get(this.url + "/api/contrat/getNbContrat");
  }


}
