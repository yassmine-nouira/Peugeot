import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import jwtDecode from 'jwt-decode';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
       
  tokenPayload:any;
      constructor(private auth:AuthService, 
        private userservice:UserService,
          private router:Router,
          private snackbarService:SnackbarService  ) { }

          
      canActivate(route:ActivatedRouteSnapshot):boolean{
       let expectedRoleArray = route.data;
       expectedRoleArray = expectedRoleArray['expectedRole'];

       this.tokenPayload =  this.userservice.GetRolebyToken(this.userservice.GetToken());
      // alert(this.tokenPayload + " YO")
      //var tokenPayload:any;

    /*  try{
        
      }
      catch(err){
      localStorage.clear();
      this.router.navigate(['']);
      alert(this.tokenPayload + " YO")
      }*/

      let expectedRole = '';

      for(let i= 0; i< expectedRoleArray['length'] ; i++){
      if(expectedRoleArray == this.tokenPayload){
      expectedRole = this.tokenPayload;
      }
      }

      //or user
      if( this.tokenPayload == 'ADMIN'
      && this.auth.isAuthenticated() && this.tokenPayload == expectedRole){
      //  alert('isAuthenticated if ')
      return true;
      }
     /* this.snackbarService.openSnackBar(GlobalConstants.unauthorized , GlobalConstants.error) ;
      this.router.navigate(['/admin/dashboard']);
      return true;*/
      
      else{
      this.router.navigate(['login']);
      localStorage.clear();
      return false;
      }
      }
     



}
