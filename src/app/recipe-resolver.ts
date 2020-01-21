import { ofType, Actions } from "@ngrx/effects";
import * as RecipesActions from "./recipes/store/recipes.actions";
import { Store } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, EMPTY, of } from "rxjs";
import { Recipe } from "./recipes/recipes.model";
import { Injectable } from "@angular/core";
import { take, map, switchMap, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class RecipeResolver implements Resolve<Recipe[]> {
  recipes: Recipe[];
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.select("recipes").pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes;
      }),
      switchMap(recipes => {
        console.log(recipes);
        if (recipes.length > 0) {
          return of(recipes);
        } else {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        }
      })
    );
  }
}
