import { Store } from "@ngrx/store";
// import { DataStorageService } from "./../shared/data-storage.service";
import * as RecipesActions from "../recipes/store/recipes.actions";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import * as fromApp from "./../store/app.reducer";
import * as AuthActions from "./../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}
  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }
  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnInit() {
    this.store.select("auth").subscribe(authState => {
      authState && authState.user
        ? (this.isAuthenticated = true)
        : (this.isAuthenticated = false);
    });
    // this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    // });
  }
}
