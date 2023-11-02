import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) { }


  public isAuthenticated():boolean{
    return localStorage.getItem("accessToken") != null;
    
    /*const token = localStorage.getItem('accessToken');
    if(!token){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }*/
  } 


}
