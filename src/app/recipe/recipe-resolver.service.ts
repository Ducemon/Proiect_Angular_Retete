import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RecipeModule} from "./Recipe.Module";
import {DataStorageServiceService} from "../header/data-storage-service.service";
import {RecipeServiceService} from "./recipe-service.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<RecipeModule[]>{

  constructor(private datastore: DataStorageServiceService, private rs: RecipeServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const recipes = this.rs.getRecipes();
      if(recipes.length === 0){
        return this.datastore.fetchRecipe();
      }else{
        return recipes;
      }
  }
}
