import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url +
      "/api/demande/add",data,{
        headers:new HttpHeaders().set('enctype',"multipart/form-data")
      });
  }


  getDemandeById(id:any){
    return this.httpClient.get(this.url +
      "/api/demande/get" + id ,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      });
  }


  getDemande(){
    return this.httpClient.get(this.url + "/api/demande/get");
  }




  delete(id:any){
    return this.httpClient.delete(this.url +
      "/api/demande/delete/" + id ,{
        headers:new HttpHeaders().set('Content-Type',"application/json; charset=utf-8; text/plain")
      });
  }



 /* sendEmail(data:any){
    return this.httpClient.post('https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=yassminexnouira@gmail.com?subject=Contrat de service' , data 
    // {  headers:new HttpHeaders().set('enctype',"multipart/form-data")     }
    );
  }
*/


sendEmail(data:any){
  return this.httpClient.post("http://localhost:3000/sendmail", data);
  // {  headers:new HttpHeaders().set('enctype',"multipart/form-data")     }
  
}

 
getNBdemande(){
  return this.httpClient.get(this.url + "/api/demande/getNbDemande");
}


}
