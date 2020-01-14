import { RecipesComponent } from "./../recipes/recipes.component";
import { RecipeService } from "./../recipes/recipe.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, exhaustMap, take } from "rxjs/operators";
import { Recipe } from "../recipes/recipes.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://angular-practice-bf19b.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          `https://angular-practice-bf19b.firebaseio.com/recipes.json`
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        console.log("firing set-recipes");
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
