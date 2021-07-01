import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendService } from "src/app/services/backend.service";
import { ShareDataService } from "src/app/services/share-data.service";

@Component({
	selector: "pokemon-details",
	template: `
		<div class="flex gap-4 items-center justify-center">
			<button (click)="prevId()"><<</button>
			<pokemon-card [pokemon]="pokemonDetails"></pokemon-card>
			<button (click)="nextId()">>></button>
		</div>

		<div class="flex w-1/3 px-4 justify-between items-center">
			<button class="border border-gray-600 px-4 py-2 rounded" (click)="like()">
				Like
			</button>
			<button
				class="border border-gray-600 px-4 py-2 rounded"
				(click)="dislike()"
			>
				Dislike
			</button>
		</div>
	`,
	// changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			:host {
				height: calc(100% - 5rem);
			}
		`,
	],
})
export class DetailsComponent implements OnInit {
	votes;
	totalPokemons: number;
	idPokemon: number;
	pokemonDetails = {};
	constructor(
		private backendService: BackendService,
		private activatedRoute: ActivatedRoute,
		private shareData: ShareDataService,
		private route: Router
	) {
		this.idPokemon = this.activatedRoute.snapshot.params.id;
	}

	ngOnInit() {
		this.getPokemonDetails();
		this.getNumberVotes();
	}

	getPokemonDetails() {
		this.backendService.getPokemonDetail(this.idPokemon).subscribe((data) => {
			this.pokemonDetails = data;
		});
	}

	@HostBinding("class") hostClass =
		"flex flex-col gap-4 items-center justify-center";

	nextId() {
		if (this.idPokemon < 102200) {
			this.backendService
				.getPokemonDetail(this.idPokemon++)
				.subscribe((data) => {
					this.pokemonDetails = data;
				});
			this.route.navigate(["pokemons", this.idPokemon]);
		}
	}

	prevId() {
		if (this.idPokemon >= 1) {
			this.backendService
				.getPokemonDetail(this.idPokemon--)
				.subscribe((data) => {
					this.pokemonDetails = data;
				});
			this.route.navigate(["pokemons", this.idPokemon]);
		}
	}

	like() {
		this.votes.likes++;
		this.shareData.setFavourite(this.votes);
	}
	getNumberVotes() {
		this.shareData.getFavourite.subscribe((data: any) => {
			this.votes = data;
		});
	}
	dislike() {
		this.votes.dislikes++;
		this.shareData.setFavourite(this.votes);
	}
}
