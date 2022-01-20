import { Injectable} from '@angular/core';
import {RecipeModule} from "./Recipe.Module";
import {Subject} from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  recipesChange = new Subject<RecipeModule[]>();


  private recipes:RecipeModule[] = [];

  getRecipe(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: RecipeModule){
    this.recipes.push(recipe);
    this.recipesChange.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: RecipeModule){
    this.recipes[index] = recipe;
    this.recipesChange.next(this.recipes.slice());

  }
  getRecipes(){
    return this.recipes.slice();
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChange.next(this.recipes.slice());

  }

  setRecipes(recipes: RecipeModule[]){
    this.recipes = recipes;
    this.recipesChange.next(this.recipes.slice());
  }

    constructor() { }
}
