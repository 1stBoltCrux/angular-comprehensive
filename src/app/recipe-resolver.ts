import { RecipeService } from "./recipes/recipe.service";
import { DataStorageService } from "./shared/data-storage.service";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipes/recipes.model";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    console.log("resolver fired");
    return this.recipeService.getRecipes().length === 0
      ? this.dataStorageService.fetchRecipes()
      : this.recipeService.getRecipes();
  }
}
