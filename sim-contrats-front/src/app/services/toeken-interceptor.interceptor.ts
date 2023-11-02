import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class ToekenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private inject: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userservice = this.inject.get(UserService);
    let authreq = request;
    authreq = this.AddTokenheader(request, userservice.GetToken());
    return next.handle(authreq).pipe(
      catchError(errordata => {
        if (errordata.status === 401) {
          // need to implement logout
          userservice.logout();
          // refresh token logic
          return this.handleRefrehToken(request, next);
        }
        return throwError(errordata);
      })
    );
  }


  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let userservice = this.inject.get(UserService);
    return userservice.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        userservice.SaveTokens(data);
        return next.handle(this.AddTokenheader(request,data.accessToken))
      }),
      catchError(errodata=>{
        userservice.logout();
        return throwError(errodata)
      })
    );
  }





  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }



}
