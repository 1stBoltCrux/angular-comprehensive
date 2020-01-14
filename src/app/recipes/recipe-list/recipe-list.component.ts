import { Recipe } from "./../recipes.model";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [];
  constructor() {}
}
