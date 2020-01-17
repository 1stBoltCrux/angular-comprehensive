import * as ShoppingListActions from "./store/shopping-list.actions";
import { Ingredient } from "./../shared/ingredient.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromShoppingList from "./store/shopping-list.reducer";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  constructor(private store: Store<fromShoppingList.AppState>) {}
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Cinnamon", 5),
    new Ingredient("Apple", 6)
  ];

  addNewIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index) {
    return this.ingredients[index];
  }

  updateIngredient(newIngredient, index) {
    this.store.dispatch(
      new ShoppingListActions.UpdateIngredient({
        ingredient: newIngredient,
        index
      })
    );
  }

  deleteIngredient(index) {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(index));
  }
}
