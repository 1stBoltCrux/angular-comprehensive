import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as RecipesActions from "./recipes.actions";
import * as fromApp from "./../../store/app.reducer";
import { Recipe } from "../recipes.model";
import { switchMap, map } from "rxjs/operators";

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
      console.log(recipes);
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      console.log("firing fetchRecipes effect");
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  // @Effect()
  // saveRecipes = this.actions$.pipe(
  //   ofType(RecipesActions.SAVE_RECIPES),
  //   map(() => {
  //     return this.store
  //       .select("recipes")
  //       .subscribe(recipesState => recipesState.recipes);
  //   }),
  //   switchMap(recipesState => {
  //     console.log(recipesState);
  //   })
  // );
}
