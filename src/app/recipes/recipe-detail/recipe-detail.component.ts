import { RecipeService } from "./../recipe.service";
import { ShoppingListService } from "./../../shopping-list/shopping-list.service";
import { Recipe } from "./../recipes.model";
import { Component, Input, OnInit } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { of } from "rxjs";
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router,
  Data
} from "@angular/router";

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
    private shoppingListService: ShoppingListService,
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
    this.shoppingListService.addNewIngredients(this.currentRecipe.ingredients);
    this.router.navigate(["/shopping-list"]);
  }
}
