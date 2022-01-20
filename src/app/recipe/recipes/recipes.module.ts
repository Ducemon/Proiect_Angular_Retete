import { NgModule } from '@angular/core';
import {RecipeComponent} from "../recipe.component";
import {RecipeListComponent} from "../recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "../recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "../recipe-detail/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "../recipe-start/recipe-start.component";
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRouteModule} from "./recipes-route.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRouteModule,

  ],
  exports: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ]
})
export class RecipesModule { }
