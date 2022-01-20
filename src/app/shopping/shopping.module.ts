import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingComponent} from "./shopping.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingRoutesModule} from "./shopping-routes.module";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingComponent,
    ShoppingEditComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    ShoppingRoutesModule
  ],
  exports:[
    ShoppingListComponent,
    ShoppingComponent,
    ShoppingEditComponent
  ],

})

export class shoppingModule{}
