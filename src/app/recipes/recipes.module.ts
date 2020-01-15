import { RecipesRouterModule } from "./recipes-router.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../directives/directives.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRouterModule,
    DirectivesModule
  ]
})
export class RecipesModule {}
