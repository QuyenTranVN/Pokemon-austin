import { Injectable } from "@angular/core";
import {
	CanActivate,
	CanActivateChild,
	CanLoad,
	Router,
} from "@angular/router";
import { of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthenticatedGuard
	implements CanLoad, CanActivate, CanActivateChild
{
	constructor(private readonly router: Router) {}

	canLoad() {
		return this.isAuth$();
	}

	canActivate() {
		return this.isAuth$();
	}

	canActivateChild() {
		return this.isAuth$();
	}

	private isAuth$() {
		// console.log("----");
		// console.log(JSON.parse(localStorage.getItem("inforUser")));

		if (JSON.parse(localStorage.getItem("inforUser"))) {
			return true;
		} else {
			this.router.navigate(["/not-auth"]);
			return false;
		}
		// return of(false).pipe(
		// 	tap((isAuth) => {
		// 		if (!isAuth) {
		// 			this.router.navigate(["/not-auth"]);
		// 		}
		// 	})
		// );
	}
}
