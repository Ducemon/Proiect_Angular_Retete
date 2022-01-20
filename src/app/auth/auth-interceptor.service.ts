import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authservice: AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler){

    return this.authservice.user.pipe(
      take(1),
      exhaustMap(user =>{

        if(!user){
          return next.handle(req);
        }

      const modreq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });

      return next.handle(modreq);
      }))

  }

}
