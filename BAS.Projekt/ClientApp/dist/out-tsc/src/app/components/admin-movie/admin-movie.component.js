import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
let AdminMovieComponent = class AdminMovieComponent {
    constructor(moviesService, notificationService, dialog) {
        this.moviesService = moviesService;
        this.notificationService = notificationService;
        this.dialog = dialog;
        this.isLoading = true;
        this.movieFilters = {
            title: '',
            releaseYearFrom: null,
            releaseYearTo: null,
            movieLengthFrom: null,
            movieLengthTo: null,
            avgRatingFrom: null,
            avgRatingTo: null,
            page: 1,
            pageSize: 10,
            orderBy: '',
            genreId: null
        };
        this.movies = {
            currentPage: 1,
            pageSize: 10,
            allPages: 1,
            allElements: 0,
            movieList: []
        };
        this.displayedColumns = ['title', 'releaseYear', 'movieLengthInMinutes', 'averageRating', 'action'];
        this.isLoading = true;
    }
    ngOnInit() {
        this.pageIndex = 0;
        this.movieFilters.pageSize = 10;
        this.getMovies();
    }
    getMovies() {
        this.moviesService.getMovies(this.movieFilters).subscribe(data => {
            this.isLoading = true;
            this.movies = data;
            this.isLoading = false;
        });
    }
    onApplyFilters(event) {
        let pageSize = this.movieFilters.pageSize;
        this.movieFilters = event;
        this.movieFilters.pageSize = pageSize;
        this.movieFilters.page = 1;
        this.pageIndex = 0;
        this.getMovies();
    }
    changePage(event) {
        if (event.pageSize != this.movieFilters.pageSize) {
            this.movieFilters.pageSize = event.pageSize;
        }
        this.pageIndex = event.pageIndex;
        this.movieFilters.page = this.pageIndex + 1;
        this.getMovies();
    }
    openDeleteDialog(id) {
        const dialogRef = this.dialog.open(DeleteMovieDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.notificationService.showSnackBarNotification('Pomyślnie usunięto film', 'Zamknij', SnackBarStyle.success);
                this.moviesService.deleteMovie(id).subscribe(() => {
                    this.getMovies();
                });
            }
        });
    }
    expandMovieDetails(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.expandedElement === element) {
                this.expandedElement = null;
            }
            else {
                this.expandedElement = element;
            }
        });
    }
    getMoviePoster(poster) {
        if (poster != null) {
            return `data:${poster.contentType};base64,${poster.file}`;
        }
        else {
            return `/assets/images/noMovieImage.png`;
        }
    }
    getMovieGenres(genres) {
        return genres.join(', ');
    }
};
AdminMovieComponent = __decorate([
    Component({
        selector: 'admin-movie',
        templateUrl: './admin-movie.component.html',
        styleUrls: ['./admin-movie.component.css'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ]
    })
], AdminMovieComponent);
export { AdminMovieComponent };
let DeleteMovieDialog = class DeleteMovieDialog {
};
DeleteMovieDialog = __decorate([
    Component({
        selector: 'delete-movie-dialog',
        templateUrl: './delete-movie-dialog.html',
    })
], DeleteMovieDialog);
export { DeleteMovieDialog };
//# sourceMappingURL=admin-movie.component.js.map