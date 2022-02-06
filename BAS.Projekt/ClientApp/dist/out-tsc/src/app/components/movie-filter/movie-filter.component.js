import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
let MovieFilterComponent = class MovieFilterComponent {
    constructor(genresService) {
        this.genresService = genresService;
        this.movieFilters = {
            title: '',
            releaseYearFrom: null,
            releaseYearTo: null,
            movieLengthFrom: null,
            movieLengthTo: null,
            avgRatingFrom: null,
            avgRatingTo: null,
            page: 0,
            pageSize: 10,
            orderBy: '',
            genreId: null
        };
        this.applyEvent = new EventEmitter();
    }
    ngOnInit() {
        this.genresService.getGenres().subscribe(data => this.genresList = data);
    }
    returnFilters(event) {
        this.movieFilters.page = 1;
        this.applyEvent.emit(this.movieFilters);
    }
};
__decorate([
    Output()
], MovieFilterComponent.prototype, "applyEvent", void 0);
MovieFilterComponent = __decorate([
    Component({
        selector: 'movie-filter',
        templateUrl: './movie-filter.component.html',
        styleUrls: ['./movie-filter.component.css']
    })
], MovieFilterComponent);
export { MovieFilterComponent };
//# sourceMappingURL=movie-filter.component.js.map