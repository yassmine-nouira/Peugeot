import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient, private router:Router) { }

  signup(data:any){
    return this.httpClient.post(this.url+
      "/api/auth/register",data,{
        headers:new HttpHeaders().set('Content-Type','application/json')
      })
  }

  login(data:any){
    return this.httpClient.post(this.url+
      "/api/auth/authenticate",data)
  }

  checkToken(){
    return this.httpClient.get(this.url+
      "/api/auth/checkToken" ) 
  }
  
  getUsers(){
    return this.httpClient.get(this.url+ "/api/v1/user/get");
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  update(data:any){
    return this.httpClient.post(this.url+
      "/api/user/update/status",data,{
        headers:new HttpHeaders().set('Content-Type','application/json')
      })
  }
/////////////////////////////////////////
  GenerateRefreshToken(){
    let input = {
      //"accessToken": this.GetToken(),
      "token": this.GetRefreshToken()
    }
    return this.httpClient.post(this.url+
      "/api/auth/refreshToken",input)
  }


  tokenresp: any;
  GetRolebyToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    return this.tokenresp.role;
  }

  GetToken() {
    return localStorage.getItem("accessToken") ;
  }
  GetRefreshToken() {
    return localStorage.getItem("token") ;
  }

   SaveTokens(tokendata: any) {
    localStorage.setItem('accessToken', tokendata.accessToken);
    localStorage.setItem('token', tokendata.token);
  }


  logout(){
    alert("Your session expired");
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


  
}
