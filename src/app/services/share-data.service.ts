import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ShareDataService {
	userInfo = JSON.parse(localStorage.getItem("inforUser"));

	private favouriteSubject = new BehaviorSubject(this.userInfo);
	getFavourite = this.favouriteSubject.asObservable();

	constructor() {}

	setFavourite(vote: any) {
		this.favouriteSubject.next(vote);
	}
}
