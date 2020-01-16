import { AuthGuard } from "./../auth/auth.guard";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: ShoppingListComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
