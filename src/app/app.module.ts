import { RecipesEffects } from "./recipes/store/recipes.effects";
import { AuthEffects } from "./auth/store/auth.effects";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { AlertComponent } from "./shared/alert/alert.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NgModule } from "@angular/core";
import { AppRouter } from "./app-router.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DirectivesModule } from "./directives/directives.module";
import { StoreModule } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "../environments/environment";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }).withServerTransition({ appId: 'serverApp' }),
    ReactiveFormsModule,
    AppRouter,
    HttpClientModule,
    DirectivesModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
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
