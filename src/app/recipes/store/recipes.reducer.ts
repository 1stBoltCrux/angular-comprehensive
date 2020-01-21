import { Recipe } from "./../recipes.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as RecipesActions from "./recipes.actions";
import { defaultIfEmpty } from "rxjs/operators";

export interface State {
  recipes: Recipe[];
  currentRecipe: Recipe;
}

const initialState: State = {
  recipes: [
    new Recipe(
      1,
      "Chicken Boolash",
      "it good",
      "https://cdn.pixabay.com/photo/2018/03/28/20/32/food-3270461_1280.jpg",
      [new Ingredient("Vegable", 68), new Ingredient("Skegable", 12)]
    ),
    new Recipe(
      2,
      "Chicken Smoolash",
      "it not good",
      "https://cdn.pixabay.com/photo/2018/03/28/20/32/food-3270461_1280.jpg",
      [new Ingredient("Vegarble", 684), new Ingredient("Skegarble", 1255)]
    )
  ],
  currentRecipe: null
};

export function recipesReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return { ...state, recipes: [...action.payload] };
    case RecipesActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case RecipesActions.UPDATE_RECIPE:
      const newRecipe = action.payload.recipe;
      let newRecipes = [...state.recipes];
      const updatedRecipeIndex = newRecipes.findIndex(recipe => {
        return recipe.id === newRecipe.id;
      });
      newRecipes[updatedRecipeIndex] = newRecipe;
      console.log(newRecipes);
      return { ...state, recipes: [...newRecipes] };
    default:
      return state;
  }
}
