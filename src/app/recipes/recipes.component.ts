import { Store } from "@ngrx/store";
import * as fromApp from "./../store/app.reducer";
import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipes.model";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.select("recipes").subscribe(recipesState => {
      this.recipes = recipesState.recipes;
    });
  }
}
