import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Pokemon } from "src/app/models/pokemon";
import { BackendService } from "src/app/services/backend.service";
import { ShareDataService } from "src/app/services/share-data.service";
import type { PaginatorState } from "../../../components/paginator/paginator.component";

@Component({
	selector: "pokemon-list",
	template: `
		<paginator
			[currentPage]="currentPage"
			[rowsPerPageOptions]="[10, 20, 40, 80]"
			[rows]="rows"
			[totalRecords]="total"
			(onPageChange)="onPageChanged($event)"
		></paginator>
		<input
			type="text"
			class="w-2/4 p-2 rounded border border-gray-600"
			placeholder="Filter by pokemon name..."
			[formControl]="query"
		/>
		<data-table
			*ngIf="listPokemon"
			[isLoading]="isLoading"
			[data]="listPokemon"
		></data-table>
	`,
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
	query = new FormControl("");
	isLoading = false;
	listPokemon: Pokemon[] = [];
	currentPage = 1;
	rows = 20;
	total;
	totalPokemons: number;
	constructor(
		private backendService: BackendService,
		private shareData: ShareDataService
	) {}

	ngOnInit() {
		this.getPokemons();
	}
	onPageChanged(paginatorState: PaginatorState) {
		this.rows = paginatorState.rows;
		this.currentPage = (paginatorState.page - 1) * this.rows + 1;
		this.getPokemons();
	}
	getPokemons() {
		this.isLoading = true;
		this.backendService
			.getPokemons(this.rows, this.currentPage - 1)
			.subscribe((data) => {
				this.listPokemon = data.results;
				this.total = data.count;
				this.isLoading = false;
			});
	}
}
