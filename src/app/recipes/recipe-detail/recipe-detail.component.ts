import * as ShoppingListActions from "./../../shopping-list/store/shopping-list.actions";
import { RecipeService } from "./../recipe.service";
import { Recipe } from "./../recipes.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromShoppingList from "./../../shopping-list/store/shopping-list.reducer";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<fromShoppingList.AppState>,
    private router: Router
  ) {
    this.recipeService.currentRecipe.subscribe(data => {
      this.currentRecipe = data;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeService.getRecipe(+params.id);
      this.id = +params.id;
    });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.currentRecipe.id);
    this.router.navigate(["/recipes"]);
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.currentRecipe.ingredients)
    );
    this.router.navigate(["/shopping-list"]);
  }
}
