import {Component, OnInit} from '@angular/core';
import {ingredient} from "./ingredients.module";
import {ShoppingServiceService} from "../shopping-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  private delet: Subscription;
  ingredients: ingredient[];

  constructor(private ShopL: ShoppingServiceService) { }



  ngOnInit(): void {
    this.ingredients = this.ShopL.getList();
    this.delet = this.ShopL.IngredientPlus.subscribe( (ingred: ingredient[]) =>{
      this.ingredients=ingred;
    })
  }

  onEditItem(index: number){
    this.ShopL.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.delet.unsubscribe();
  }
}
