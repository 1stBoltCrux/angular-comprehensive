import * as RecipesActions from "./../store/recipes.actions";
import { switchMap, map } from "rxjs/operators";
import * as ShoppingListActions from "./../../shopping-list/store/shopping-list.actions";
import { RecipeService } from "./../recipe.service";
import { Recipe } from "./../recipes.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "./../../store/app.reducer";

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
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select("recipes").pipe(
            map(recipesState => {
              return recipesState.recipes.find(recipe => {
                return recipe.id === this.id;
              });
            })
          );
        })
      )
      .subscribe(currentRecipe => {
        this.currentRecipe = currentRecipe;
      });

    //
  }

  onDelete() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.currentRecipe.ingredients)
    );
    this.router.navigate(["/shopping-list"]);
  }
}
