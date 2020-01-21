import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import { Store } from "@ngrx/store";
import { AuthService } from "./auth/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Recipe Thingus";

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
