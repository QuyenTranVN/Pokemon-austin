import { ChangeDetectionStrategy, Component, VERSION } from "@angular/core";
import { Router } from "@angular/router";
import { ShareDataService } from "src/app/services/share-data.service";
import { UserService } from "src/app/services/user.service";
import { User } from "../../models/user";

@Component({
	selector: "navbar",
	template: `
		<nav>
			<h4>Pokemon v{{ version }}</h4>
			<button *ngIf="isLoggedIn; else notLoggedIn" (click)="logOut()">
				I am {{ user?.name }}, and I like {{ user?.likes }} and dislike
				{{ user?.dislikes }} pokemons / Log Out
			</button>
			<ng-template #notLoggedIn>
				<button (click)="logIn()">Log In</button>
			</ng-template>
		</nav>
	`,
	styles: [
		`
			nav {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1rem;
				background-color: hotpink;
				color: white;
			}

			h4 {
				margin: 0;
				font-size: 2rem;
			}

			button {
				background: transparent;
				outline: none;
				border: 1px solid;
				border-radius: 0.25rem;
				padding: 0.5rem 1rem;
				color: white;
				cursor: pointer;
				font-size: 1rem;
				font-family: "Source Sans Pro";
			}
		`,
	],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
	version = VERSION.full;
	user: User = { name: "", likes: null, dislikes: null };
	isLoggedIn = false;
	constructor(
		private userService: UserService,
		private router: Router,
		private shareData: ShareDataService
	) {}

	ngOnInit() {
		this.isLoggedIn =
			JSON.parse(localStorage.getItem("inforUser")).name !== "" ? true : false;
		console.log(localStorage.getItem("inforUser"));
		if (JSON.parse(localStorage.getItem("inforUser"))) {
			this.user = JSON.parse(localStorage.getItem("inforUser"));
		}
		this.getLikes();
		this.getDislikes();
	}
	logIn() {
		this.userService.isLogin(true);
		this.user = {
			name: "Quyen",
			likes: 0,
			dislikes: 0,
		};
		localStorage.setItem("inforUser", JSON.stringify(this.user));
		this.router.navigate(["/pokemons"]);
		this.isLoggedIn = true;
	}

	logOut() {
		this.userService.isLogin(false);
		localStorage.removeItem("inforUser");
		this.user = { name: "", likes: null, dislikes: null };
		this.shareData.like(0);
		this.shareData.dislike(0);
		this.router.navigate(["/not-auth"]);
		this.isLoggedIn = false;
	}

	getLikes() {
		this.shareData.likePokemon.subscribe((data: any) => {
			this.user.likes = data;
			localStorage.setItem("inforUser", JSON.stringify(this.user));
		});
	}
	getDislikes() {
		this.shareData.dislikePokemon.subscribe((data: any) => {
			this.user.dislikes = data;
			localStorage.setItem("inforUser", JSON.stringify(this.user));
		});
	}
}
