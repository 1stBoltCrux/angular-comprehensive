import { Store } from "@ngrx/store";
import { RecipeService } from "./../recipes/recipe.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, exhaustMap, take, switchMap } from "rxjs/operators";
import { Recipe } from "../recipes/recipes.model";
import * as fromApp from "./../store/app.reducer";
import * as RecipesActions from "./../recipes/store/recipes.actions";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    this.store
      .select("recipes")
      .pipe(
        switchMap(recipesState => {
          return this.http.put(
            "https://angular-practice-bf19b.firebaseio.com/recipes.json",
            recipesState.recipes
          );
        })
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  // fetchRecipes() {
  //   return this.store.select("auth").pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this.http.get<Recipe[]>(
  //         `https://angular-practice-bf19b.firebaseio.com/recipes.json`
  //       );
  //     }),
  //     map(recipes => {
  //       console.log(recipes);
  //       return recipes.map(recipe => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : []
  //         };
  //       });
  //     }),
  //     tap(recipes => {
  //       this.store.dispatch(new RecipesActions.FetchRecipes(recipes));
  //       // this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }
}
