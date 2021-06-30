import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ShareDataService {
	userInfoLike = JSON.parse(localStorage.getItem("inforUser"))
		? JSON.parse(localStorage.getItem("inforUser")).likes
		: 0;
	userInfoDisLike = JSON.parse(localStorage.getItem("inforUser"))
		? JSON.parse(localStorage.getItem("inforUser")).dislikes
		: 0;
	private totalPokemonSubject = new BehaviorSubject({});
	totalPokemon = this.totalPokemonSubject.asObservable();

	private likePokemonSubject = new BehaviorSubject(this.userInfoLike);
	likePokemon = this.likePokemonSubject.asObservable();

	private dislikePokemonSubject = new BehaviorSubject(this.userInfoDisLike);
	dislikePokemon = this.dislikePokemonSubject.asObservable();

	constructor() {}

	total(total: number) {
		this.totalPokemonSubject.next(total);
	}

	like(like: number) {
		this.likePokemonSubject.next(like);
	}
	dislike(dislike: number) {
		this.dislikePokemonSubject.next(dislike);
	}
}
