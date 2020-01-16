import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "../recipe-resolver";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";

const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuard],
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRouterModule {}
