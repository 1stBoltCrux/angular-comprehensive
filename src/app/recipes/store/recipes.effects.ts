import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as RecipesActions from "./recipes.actions";
import * as fromApp from "./../../store/app.reducer";
import { Recipe } from "../recipes.model";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      console.log("test");
      return this.http.get<Recipe[]>(
        `https://angular-practice-bf19b.firebaseio.com/recipes.json`
      );
    }),
    map(recipes => {
      const newRecipes = recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
      return new RecipesActions.SetRecipes(newRecipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(
      this.store.select("recipes").pipe(map(recipeState => recipeState.recipes))
    ),
    switchMap(([, recipes]) => {
      console.log(recipes);
      return this.http.put(
        "https://angular-practice-bf19b.firebaseio.com/recipes.json",
        recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
