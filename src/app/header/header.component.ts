import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageServiceService} from "./data-storage-service.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector:'app-header',
  templateUrl:'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  auth = false;
  private UserSub: Subscription;

  constructor(private datastore: DataStorageServiceService, private authservice: AuthService) {
  }

  ngOnInit() {
    this.UserSub = this.authservice.user.subscribe( user =>{
      this.auth = !!user;
    })
  }

  SaveData(){
    this.datastore.storeRecipe();
  }

  FetchData(){
    this.datastore.fetchRecipe().subscribe();
  }

  onLogOut(){
    this.authservice.LogOut();
  }

  ngOnDestroy() {
    this.UserSub.unsubscribe();
  }
}
