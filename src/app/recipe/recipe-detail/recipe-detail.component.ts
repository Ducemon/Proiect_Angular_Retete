import {Component, OnInit} from '@angular/core';
import {RecipeModule} from "../Recipe.Module";
import {ShoppingServiceService} from "../../shopping/shopping-service.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeServiceService} from "../recipe-service.service";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: RecipeModule;
  id: number;

  constructor(private RecipeService: RecipeServiceService,private ShopL:ShoppingServiceService, private  route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.recipe = this.RecipeService.getRecipe(this.id);
      }
    )
  }

  AddToShop(){
    this.ShopL.AddToList(this.recipe.ingredients)
  }

  onEdit(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDelete(){
    this.RecipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }


}
