import { Store } from "@ngrx/store";
import * as RecipesActions from "../recipes/store/recipes.actions";
import { Component, OnInit } from "@angular/core";
import * as fromApp from "./../store/app.reducer";
import * as AuthActions from "./../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private store: Store<fromApp.AppState>) {}
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
  }
}
