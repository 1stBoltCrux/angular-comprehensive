import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  currentRecipe = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipe(id: number) {
    const selectedRecipe = this.recipes.find(recipe => {
      return recipe.id === id;
    });
    this.currentRecipe.next(selectedRecipe);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(updatedRecipe: Recipe, id) {
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      if (recipe.id === id) {
        this.recipes[i] = updatedRecipe;
      }
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id) {
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      if (recipe.id === id) {
        this.recipes.splice(i, 1);
      }
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(recipes);
  }
}
