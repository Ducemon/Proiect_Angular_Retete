import { Injectable } from '@angular/core';
import {ingredient} from "./shopping-list/ingredients.module";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingServiceService {
  IngredientPlus = new Subject<ingredient[]>();
  startedEditing = new Subject<number>()
  private ingredients: ingredient[]=[
    new ingredient('peste',5)
  ];
  constructor() { }

  getList(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  onAdd(ing: ingredient){
    this.ingredients.push(ing);
    this.IngredientPlus.next(this.ingredients.slice());
  }
  AddToList(ingredients: ingredient[]){
    this.ingredients.push(...ingredients);
    this.IngredientPlus.next(this.ingredients.slice());

  }
  updateIngredient(index: number, ing: ingredient){
    this.ingredients[index] = ing;
    this.IngredientPlus.next(this.ingredients.slice());

  }
  deleteIngredient(index:number) {
    this.ingredients.splice(index, 1);
    this.IngredientPlus.next(this.ingredients.slice());
  }
}
