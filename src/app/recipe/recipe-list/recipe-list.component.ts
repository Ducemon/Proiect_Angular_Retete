import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModule} from "../Recipe.Module";
import {RecipeServiceService} from "../recipe-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:RecipeModule[] ;
  sub: Subscription;
  constructor(private recipeService:RecipeServiceService, private route:Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.recipeService.recipesChange.subscribe(
      (recipes: RecipeModule[]) =>{
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }
  onNew(){
    this.route.navigate(['new'], {relativeTo: this.ar});

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
