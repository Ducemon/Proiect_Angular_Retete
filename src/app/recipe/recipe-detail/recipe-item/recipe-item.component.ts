import {Component, OnInit, Input } from '@angular/core';
import {RecipeModule} from "../../Recipe.Module";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {

  @Input() rep: RecipeModule ;
  @Input() index: number



  ngOnInit(): void {
  }

}
