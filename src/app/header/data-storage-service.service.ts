import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeServiceService} from "../recipe/recipe-service.service";
import {RecipeModule} from "../recipe/Recipe.Module";
import { map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageServiceService {

  constructor(private http: HttpClient, private recipeService: RecipeServiceService) {}

  storeRecipe(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://monke-a87e1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(
        response =>{
          console.log(response);
        }
      )
  }

  fetchRecipe(){


    return this.http.get<RecipeModule[]>('https://monke-a87e1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
      map(rep =>{
        return rep.map( recipe =>{
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
        tap(recipes =>{
          this.recipeService.setRecipes(recipes);

        })
    );

  }



}
