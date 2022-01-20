import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/auth/user/user.module';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {

  user: UserModule = JSON.parse(localStorage.getItem('UserData'));

  constructor() { }


  ngOnInit(): void {


  }

}
