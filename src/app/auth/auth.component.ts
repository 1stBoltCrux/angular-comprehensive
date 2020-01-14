import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { errorDictionary } from "../shared/firebase-error.dictionary";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Component({
  selector: "app-auth",
  templateUrl: "auth.component.html"
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;
    const { email, password } = this.authForm.value;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
        this.error = null;
      },
      error => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }
}
