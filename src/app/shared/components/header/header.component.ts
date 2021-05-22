import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AdminGuard } from "src/app/admin.guard";
import { AuthService } from "src/app/core/services/auth.service";
import { CartService } from "src/app/core/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;

  constructor(
    private cartService: CartService,
    private adminGuard: AdminGuard,
    private auth: AuthService,
    private router: Router
  ) {
    this.total$ = this.cartService.cart$.pipe(
      map((products) => products.length)
    );
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(["/home"]);
    });
  }

  logged() {
    return this.adminGuard.hasUserLogged() === true ? false : true;
  }

  notLogged(){
    return this.adminGuard.hasUserLogged() === false ? false : true;
  }

  ngOnInit() {}
}
