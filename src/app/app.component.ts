import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import { Store } from "@ngrx/store";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Recipe Thingus";

  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(PLATFORM_ID)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    console.log("hello from appcomponent");
  }
}
