import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeServiceService} from "../recipe-service.service";
import {ingredient} from "../../shopping/shopping-list/ingredients.module";
import {RecipeModule} from "../Recipe.Module";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number
  edit = false;
  recipeform: FormGroup;
  constructor(private route:ActivatedRoute, private recipeservice: RecipeServiceService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.edit = params['id'] != null;
        this.InitForm();

      }
    )
  }

  onSubmit(){
    if(this.edit){
      this.recipeservice.updateRecipe(this.id, this.recipeform.value);
    }else{
      this.recipeservice.addRecipe(this.recipeform.value);
    }
    this.onCancel();
  }

  get controls() {
    return (<FormArray>this.recipeform.get('ingredients')).controls;
  }

  onAddIng(){
    (<FormArray>this.recipeform.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeform.get('ingredients')).removeAt(index);
  }



  private InitForm(){

    let recipename = '';
    let imgPath = '';
    let recipedesc = '';
    let recipeing = new FormArray([]);

    if(this.edit){
      const recipe = this.recipeservice.getRecipe(this.id);
      recipename = recipe.name;
      imgPath = recipe.imgPath;
      recipedesc = recipe.description;


      if(recipe['ingredients']){
        for (let i of recipe.ingredients){
          recipeing.push(
            new FormGroup({
              'name': new FormControl(i.name, Validators.required),
              'quantity': new FormControl(i.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          )
        }
      }

    }

    this.recipeform = new FormGroup({
      'name': new FormControl(recipename, Validators.required),
      'imgPath': new FormControl(imgPath, Validators.required),
      'description': new FormControl(recipedesc),
      'ingredients': recipeing,
    });

  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
