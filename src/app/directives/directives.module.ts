import { DropdownDirective } from "./dropdown.directive";
import { BetterHighlightDirective } from "./better-highlight.directive";
import { NgModule } from "@angular/core";
import { PlaceHolderDirective } from "./placeholder.directive";

@NgModule({
  declarations: [
    PlaceHolderDirective,
    BetterHighlightDirective,
    DropdownDirective
  ],
  exports: [PlaceHolderDirective, BetterHighlightDirective, DropdownDirective]
})
export class DirectivesModule {}
