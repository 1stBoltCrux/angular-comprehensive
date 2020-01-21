import * as RecipesActions from "./../store/recipes.actions";
import { Store } from "@ngrx/store";
import * as fromApp from "./../../store/app.reducer";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Recipe } from "./../recipes.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id: number;
  editMode = false;
  currentRecipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.id = id;
          this.editMode = !!id;
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

    let name = "";
    let description = "";
    let imagePath = "";
    const ingredients = new FormArray([]);

    if (this.editMode) {
      name = this.currentRecipe.name;
      description = this.currentRecipe.description;
      imagePath = this.currentRecipe.imagePath;
      if (this.currentRecipe.ingredients) {
        for (const ingredient of this.currentRecipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients
    });
  }

  getIngredientControls() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }

  onAddIngredients() {
    const controlGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });

    (<FormArray>this.recipeForm.get("ingredients")).push(controlGroup);
  }

  onDeleteIngredient(index) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onSubmit() {
    const newRecipe = {
      id: this.editMode ? this.id : Math.round(Math.random() * 1000),
      ...this.recipeForm.value
    };

    if (this.editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({ recipe: newRecipe, id: this.id })
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
    }
    this.onCancel();
  }
}
