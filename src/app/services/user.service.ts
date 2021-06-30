import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private loginSubject = new BehaviorSubject(false);
	authenLogin = this.loginSubject.asObservable();

	private logoutSubject = new BehaviorSubject(false);
	authenLogout = this.logoutSubject.asObservable();

	constructor() {}
	isLogin(isLogin: boolean) {
		this.loginSubject.next(isLogin);
	}
	isLogout(isLogout: boolean) {
		this.logoutSubject.next(isLogout);
	}
}
