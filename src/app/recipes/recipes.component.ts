import { DataStorageService } from "./../shared/data-storage.service";
import { Store } from "@ngrx/store";
import * as fromApp from "./../store/app.reducer";
import * as RecipesActions from "./store/recipes.actions";
import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipes.model";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private store: Store<fromApp.AppState>,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.store.select("recipes").subscribe(recipesState => {
      this.recipes = recipesState.recipes;
    });
  }
}
