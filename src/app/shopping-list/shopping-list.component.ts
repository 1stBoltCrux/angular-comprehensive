import { StartEdit } from "./store/shopping-list.actions";
import { ShoppingListService } from "./shopping-list.service";
import { Ingredient } from "./../shared/ingredient.model";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
  }
  onEditItem(index) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
