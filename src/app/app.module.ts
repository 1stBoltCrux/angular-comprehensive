import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { AlertComponent } from "./shared/alert/alert.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRouter } from "./app-router.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DirectivesModule } from "./directives/directives.module";
import { StoreModule } from "@ngrx/store";
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouter,
    HttpClientModule,
    DirectivesModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule {}
