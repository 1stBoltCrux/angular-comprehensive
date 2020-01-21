import { Recipe } from "./../recipes.model";
import { Action } from "@ngrx/store";

export const ADD_RECIPE = "[RECIPES] - ADD RECIPE";
export const UPDATE_RECIPE = "[RECIPES] - UPDATE RECIPE";
export const DELETE_RECIPE = "[RECIPES] - DELETE RECIPE";
export const FETCH_RECIPES = "[RECIPES] - FETCH RECIPES";
export const SET_RECIPES = "[RECIPES] - SET RECIPES";
export const STORE_RECIPES = "[RECIPES] - STORE RECIPES";

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}
export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}
export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;

  constructor(public payload: Recipe[]) {}
}
export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { recipe: Recipe; id: number }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export type RecipesActions =
  | AddRecipe
  | FetchRecipes
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes
  | SetRecipes;
