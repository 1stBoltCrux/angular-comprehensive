import { RecipeService } from "./recipe.service";
import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipes.model";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });
  }
}
