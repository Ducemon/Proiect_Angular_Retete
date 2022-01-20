import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {UserModule} from "./user/user.module";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<UserModule>(null);
  tokentime: any;

  constructor(private http: HttpClient, private router:Router) { }

  SignUp(email: string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebase.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.HandleError), tap(resData =>{

        this.HandleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)

      }));
  }

  LogIn(email: string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebase

      .apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.HandleError), tap(resData =>{

        this.HandleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)

      }));

  }

  LogOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('UserData');
    if(this.tokentime){
      clearTimeout(this.tokentime)
    }
    this.tokentime = null;
  }

  autoLogIn(){
    const userData = JSON.parse(localStorage.getItem('UserData'));

    if(!userData){
      return ;
    }

    const loadedUser = new UserModule(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expdate = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogOut(expdate);
    }
  }

  autoLogOut(expiration: number,){

    this.tokentime = setTimeout(() =>{
      this.LogOut();
    },expiration)
  }

  private HandleAuth(email: string, ID: string, token: string, expdate: number) {
    const expDate = new Date(new Date().getTime() + expdate*1000)
    const user = new UserModule(email, ID, token, expDate);
    this.user.next(user);
    this.autoLogOut(+ expdate*1000);
    localStorage.setItem('UserData', JSON.stringify(user));
  }


  private HandleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'Unknown error occurred';
    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid email or password';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email or password';
        break;
    }

    return throwError(errorMessage);
  }
}
