import {ingredient} from "../shopping/shopping-list/ingredients.module";

export class RecipeModule{
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredients: ingredient[];

  constructor(name: string, desc: string, img: string, ing: ingredient[]) {
    this.name=name;
    this.description=desc;
    this.imgPath=img;
    this.ingredients=ing;
  }
}
