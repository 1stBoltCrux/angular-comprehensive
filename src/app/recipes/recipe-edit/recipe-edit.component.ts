import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "./../recipe.service";
import { Recipe } from "./../recipes.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

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
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeService.currentRecipe.subscribe(recipe => {
      this.currentRecipe = recipe;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = !!params.id;
    });

    this.recipeService.getRecipe(this.id);

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
      this.recipeService.updateRecipe(newRecipe, this.id);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
}
