import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService, AuthResponseData} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogged = true;
  isLoading = false;
  error: string = null;

  constructor(private authservice: AuthService, private router: Router) { }


  onSwitch(){
    this.isLogged = !this.isLogged;
  }

  onSubmit(form: NgForm){
    if(!form.valid)
    {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;


    this.isLoading = true;
    if(this.isLogged){
      authObs = this.authservice.LogIn(email, password);
    }else{

      authObs = this.authservice.SignUp(email,password)
    }

    authObs.subscribe(responseData =>
      {
        console.log((responseData));
        this.isLoading = false;
        this.router.navigate(['/recipes']);

      },
      error => {
        console.log(error);
        this.error = error;
        this.isLoading = false;

      });

    form.reset();

  }

  ngOnInit(): void {
  }

}
