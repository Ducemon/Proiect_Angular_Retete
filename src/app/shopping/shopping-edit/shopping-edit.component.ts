import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ingredient} from "../shopping-list/ingredients.module";
import {ShoppingServiceService} from "../shopping-service.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  sub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: ingredient;

  @ViewChild('f') form: NgForm;
  @Output() ingredientAdded = new EventEmitter<ingredient>();

  constructor(private ShopL: ShoppingServiceService) { }

  onAddItem(form: NgForm){
    const value = form.value
    const ing = new ingredient(value.name, value.quantity);
    if(this.editMode){
      this.ShopL.updateIngredient(this.editedItemIndex, ing);
    }else{
      this.ShopL.onAdd(ing);

    }
    this.editMode = false;
    form.reset();

  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.ShopL.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

  ngOnInit(): void {
    this.sub = this.ShopL.startedEditing.subscribe(
      (index:number) =>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.ShopL.getIngredient(index)
        this.form.setValue({
          name: this.editedItem.name,
          quantity: this.editedItem.quantity,
        })

      }
    );
  }

  ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
