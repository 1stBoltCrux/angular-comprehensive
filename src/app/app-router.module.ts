import { AuthComponent } from "./auth/auth.component";
import { RecipeResolver } from "./recipe-resolver";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        resolve: [RecipeResolver],
        component: RecipeDetailComponent
      },
      {
        path: ":id/edit",
        resolve: [RecipeResolver],
        component: RecipeEditComponent
      }
    ]
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent
  },
  {
    path: "auth",
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserModule
  ],
  exports: [RouterModule],
  declarations: [RecipeStartComponent, RecipeEditComponent],
  providers: [RecipeResolver]
})
export class AppRouter {}
