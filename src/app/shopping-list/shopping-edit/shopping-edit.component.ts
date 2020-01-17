import { Ingredient } from "./../../shared/ingredient.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "./../store/shopping-list.actions";
import * as fromShoppingList from "./../store/shopping-list.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  editMode = false;
  editedItem: Ingredient;
  startedEditingSubscription: Subscription;
  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.store.select("shoppingList").subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.ingredientForm.setValue({
          ingredientName: this.editedItem.name,
          ingredientAmount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    this.ingredientForm = new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      ingredientAmount: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(
      value.ingredientName,
      value.ingredientAmount
    );

    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.onClear();
  }
  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.editMode = false;
    this.onClear();
  }

  onClear() {
    this.ingredientForm.setValue({
      ingredientName: "",
      ingredientAmount: ""
    });
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onCancel() {
    this.editMode = false;
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
