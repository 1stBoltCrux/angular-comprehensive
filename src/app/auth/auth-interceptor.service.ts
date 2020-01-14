import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { take } from "rxjs/operators";
import { User } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  user: User;
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.authService.user.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
    if (this.user && this.user.token) {
      const modifiedReq = req.clone({
        params: req.params.append("auth", this.user.token)
      });

      return next.handle(modifiedReq);
    } else {
      console.log("token does not exist" + req);
      return next.handle(req);
    }
  }
}
