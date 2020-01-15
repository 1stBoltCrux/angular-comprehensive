import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [LoadingSpinnerComponent, AlertComponent],
  exports: [LoadingSpinnerComponent, AlertComponent]
})
export class SharedModule {}
