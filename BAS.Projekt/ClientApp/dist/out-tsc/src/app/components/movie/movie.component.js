import { __awaiter, __decorate } from "tslib";
import { UserRole } from './../../interfaces/auth/role';
import { Component } from '@angular/core';
import { FilmCrew } from 'src/app/interfaces/FilmCrew';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
import { DeleteReviewDialogComponent } from '../dialogs/delete-review-dialog/delete-review-dialog.component';
let MovieComponent = class MovieComponent {
    constructor(route, movieService, authService, reviewService, notificationService, dialog) {
        this.route = route;
        this.movieService = movieService;
        this.authService = authService;
        this.reviewService = reviewService;
        this.notificationService = notificationService;
        this.dialog = dialog;
        this.canUserReview = false;
        this.displayReviewForm = false;
        this.userSignedIn = false;
        this.movie = {
            id: 0,
            title: '',
            description: '',
            releaseYear: 0,
            movieLengthInMinutes: 0,
            averageRating: 0,
            moviePoster: null,
            genres: [],
            personnel: [],
        };
        this.reviews = {
            currentPage: 0,
            pageSize: 5,
            allPages: 0,
            allElements: 0,
            reviewList: []
        };
        this.reviewFilters = {
            id: this.route.snapshot.params.id,
            page: 0,
            pageSize: 5,
            orderBy: '',
        };
        this.isLoading = true;
        this.notFound = false;
        this.areReviewsLoading = true;
        this.canLoadReviews = true;
        this.actors = [];
        this.directors = [];
        this.writers = [];
    }
    ngOnInit() {
        this.getMovie(this.route.snapshot.params.id);
        this.getReviews(this.reviewFilters);
        this.checkIfUserSignedIn();
        this.checkIfUserCanReview();
    }
    checkIfUserSignedIn() {
        if (this.authService.currentUserValue != null) {
            this.userSignedIn = true;
        }
        else {
            this.userSignedIn = false;
        }
    }
    checkIfUserCanReview() {
        this.reviewService.didUserReviewMovie(this.route.snapshot.params.id).subscribe(result => {
            if (result) {
                this.canUserReview = false;
            }
            else {
                this.canUserReview = true;
            }
        });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isLoading = true;
                this.movie = yield this.movieService.getMovie(id);
                this.splitMoviePersonnel(this.movie.personnel);
                this.isLoading = false;
            }
            catch (exception) {
                this.isLoading = false;
                this.notFound = true;
            }
        });
    }
    getReviews(reviewFilters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.reviewFilters.page += 1;
                this.canLoadReviews = true;
                this.areReviewsLoading = true;
                let riwjus = yield this.reviewService.getMovieReviews(reviewFilters);
                this.reviews.currentPage = riwjus.currentPage;
                this.reviews.allPages = riwjus.allPages;
                this.reviews.allElements = riwjus.allElements;
                riwjus.reviewList.forEach(riwju => {
                    this.reviews.reviewList.push(riwju);
                });
                if (this.reviews.reviewList.length == this.reviews.allElements) {
                    this.canLoadReviews = false;
                }
                this.areReviewsLoading = false;
            }
            catch (exception) {
                this.areReviewsLoading = false;
            }
        });
    }
    refreshReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.reviewFilters.page = 1;
                this.canLoadReviews = true;
                this.areReviewsLoading = true;
                let riwjus = yield this.reviewService.getMovieReviews(this.reviewFilters);
                this.reviews.currentPage = riwjus.currentPage;
                this.reviews.allPages = riwjus.allPages;
                this.reviews.allElements = riwjus.allElements;
                this.reviews.reviewList = [];
                riwjus.reviewList.forEach(riwju => {
                    this.reviews.reviewList.push(riwju);
                });
                if (this.reviews.reviewList.length == this.reviews.allElements) {
                    this.canLoadReviews = false;
                }
                this.areReviewsLoading = false;
            }
            catch (exception) {
                this.areReviewsLoading = false;
            }
        });
    }
    getDirectors() {
        return this.directors.map(director => `${director.name} ${director.surname}`).join(', ');
    }
    getWriters() {
        return this.writers.map(writer => `${writer.name} ${writer.surname}`).join(', ');
    }
    getActors() {
        return this.actors.map(actor => `${actor.name} ${actor.surname}`).join(', ');
    }
    getMoviePoster(poster) {
        if (poster != null) {
            return `data:${poster.contentType};base64,${poster.file}`;
        }
        else {
            return '/assets/images/noMovieImage.png';
        }
    }
    getMovieLengthInHours(movieLength) {
        let hours = Math.floor(movieLength / 60);
        let minutes = movieLength % 60;
        let movieLengthInHours = hours + "h " + minutes + "min ";
        return movieLengthInHours;
    }
    splitMoviePersonnel(personnel) {
        this.actors = [];
        this.directors = [];
        this.writers = [];
        personnel.forEach(person => {
            if (person.memberPosition == FilmCrew.Actor) {
                this.actors.push(person);
            }
            else if (person.memberPosition == FilmCrew.Director) {
                this.directors.push(person);
            }
            else {
                this.writers.push(person);
            }
        });
    }
    showReviewForm(event) {
        this.displayReviewForm = true;
    }
    onReviewFormSubmit(event) {
        if (event) {
            this.canUserReview = false;
            this.notificationService.showSnackBarNotification('Pomyślnie opublikowano recenzję', 'Zamknij', SnackBarStyle.success);
            this.getMovie(this.route.snapshot.params.id);
            this.refreshReviews();
            this.displayReviewForm = false;
        }
        else {
            this.displayReviewForm = false;
        }
    }
    onLoadReviews() {
        this.reviewFilters.page = 0;
        this.getReviews(this.reviewFilters);
    }
    canDeleteReview(userId) {
        return this.authService.currentUserValue != null && (this.authService.currentUserValue.id === userId || this.authService.currentUserValue.userRole == UserRole.Admin);
    }
    openDeleteDialog(userId, movieId) {
        const dialogRef = this.dialog.open(DeleteReviewDialogComponent);
        console.log(userId, movieId);
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.reviewService.deleteReview(userId, movieId).subscribe(() => {
                    this.notificationService.showSnackBarNotification('Pomyślnie usunięto recenzję', 'Zamknij', SnackBarStyle.success);
                    this.getMovie(this.route.snapshot.params.id);
                    this.refreshReviews();
                    this.checkIfUserCanReview();
                });
            }
        });
    }
    getStringRating(rating) {
        let roundedRating = Math.round(rating * 10) / 10.0;
        let stringRating = roundedRating.toString();
        if (stringRating.indexOf(".") < 0) {
            stringRating += ".0";
        }
        return stringRating;
    }
};
MovieComponent = __decorate([
    Component({
        selector: 'app-movie',
        templateUrl: './movie.component.html',
        styleUrls: ['./movie.component.css']
    })
], MovieComponent);
export { MovieComponent };
//# sourceMappingURL=movie.component.js.map