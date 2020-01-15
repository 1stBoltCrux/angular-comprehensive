import { ReactiveFormsModule } from "@angular/forms";
import { ShoppingListComponent } from "./shopping-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [ReactiveFormsModule, CommonModule, ShoppingListRoutingModule]
})
export class ShoppingListModule {}
