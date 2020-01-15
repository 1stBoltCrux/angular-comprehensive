import { SharedModule } from "./../shared/shared.module";

import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../directives/directives.module";
@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild([{ path: "auth", component: AuthComponent }])
  ]
})
export class AuthModule {}
