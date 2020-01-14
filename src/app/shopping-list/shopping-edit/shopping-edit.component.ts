import { ShoppingListService } from "./../shopping-list.service";
import { Ingredient } from "./../../shared/ingredient.model";
import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  Renderer2
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  startedEditingSubscription: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      ingredientAmount: new FormControl(null, Validators.required)
    });

    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          ingredientName: this.editedItem.name,
          ingredientAmount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }

  onSubmit(): void {
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(
      value.ingredientName,
      value.ingredientAmount
    );

    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        newIngredient,
        this.editedItemIndex
      );
    } else {
      this.shoppingListService.addNewIngredientToList(newIngredient);
    }
    this.editMode = false;
    this.onClear();
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.onClear();
  }

  onClear() {
    this.ingredientForm.setValue({
      ingredientName: "",
      ingredientAmount: ""
    });
  }

  onCancel() {
    this.editMode = false;
    this.onClear();
  }
}
