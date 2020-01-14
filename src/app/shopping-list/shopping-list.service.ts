import { Ingredient } from "./../shared/ingredient.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Cinnamon", 5),
    new Ingredient("Apple", 6)
  ];

  addNewIngredientToList(newIngredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addNewIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index) {
    return this.ingredients[index];
  }

  updateIngredient(newIngredient, index) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  constructor() {}
}
