import { __awaiter, __decorate } from "tslib";
import { DeleteReviewDialogComponent } from './../dialogs/delete-review-dialog/delete-review-dialog.component';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
let AdminReviewComponent = class AdminReviewComponent {
    constructor(userService, movieService, reviewService, dialog, notificationService) {
        this.userService = userService;
        this.movieService = movieService;
        this.reviewService = reviewService;
        this.dialog = dialog;
        this.notificationService = notificationService;
        this.reviewFilter = {
            userId: null,
            movieId: null,
            page: 1,
            pageSize: 10,
            orderBy: 'movieasc'
        };
        this.reviews = {
            currentPage: 1,
            pageSize: 10,
            allPages: 0,
            allElements: 0,
            reviewList: []
        };
        this.userInput = new FormControl();
        this.usersInDropdown = [];
        this.movieInput = new FormControl();
        this.moviesInDropdown = [];
        this.isLoading = true;
        this.displayedColumns = ['movieTitle', 'username', 'rating', 'action'];
    }
    ngOnInit() {
        this.getUsersToSelect('');
        this.getMoviesToSelect('');
        this.getAllReviews();
    }
    getUsersToSelect(startsWith) {
        return __awaiter(this, void 0, void 0, function* () {
            this.usersInDropdown = yield this.userService.getUsersToSelect(startsWith);
        });
    }
    getMoviesToSelect(startsWith) {
        return __awaiter(this, void 0, void 0, function* () {
            this.moviesInDropdown = yield this.movieService.getMoviesToSelect(startsWith);
        });
    }
    getAllReviews() {
        this.reviewService.getAllReviews(this.reviewFilter).subscribe(data => {
            this.reviews = data;
            this.isLoading = false;
        });
    }
    getUserFromDropdown(username) {
        return this.usersInDropdown.find(user => user.username == username);
    }
    getMovieFromDropdown(title) {
        return this.moviesInDropdown.find(movie => movie.title == title);
    }
    selectUser(event) {
        let user = this.getUserFromDropdown(event.option.viewValue);
        this.selectedUser = user;
    }
    selectMovie(event) {
        let movie = this.getMovieFromDropdown(event.option.viewValue);
        this.selectedMovie = movie;
    }
    onUserInputChange(startsWith) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getMoviesToSelect(startsWith);
        });
    }
    onMovieInputChange(startsWith) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getMoviesToSelect(startsWith);
        });
    }
    clearUser() {
        this.selectedUser = null;
        this.userInput.setValue('');
    }
    clearMovie() {
        this.selectedMovie = null;
        this.movieInput.setValue('');
    }
    changePage(event) {
        if (event.pageSize != this.reviewFilter.pageSize) {
            this.reviewFilter.pageSize = event.pageSize;
        }
        this.pageIndex = event.pageIndex;
        this.reviewFilter.page = this.pageIndex + 1;
        this.getAllReviews();
    }
    expandReviewDetails(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.expandedElement === element) {
                this.expandedElement = null;
            }
            else {
                this.expandedElement = element;
            }
        });
    }
    onApplyFilters(event) {
        var _a, _b;
        this.reviewFilter.movieId = (_a = this.selectedMovie) === null || _a === void 0 ? void 0 : _a.id;
        this.reviewFilter.userId = (_b = this.selectedUser) === null || _b === void 0 ? void 0 : _b.id;
        this.getAllReviews();
    }
    openDeleteDialog(userId, movieId) {
        const dialogRef = this.dialog.open(DeleteReviewDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.reviewService.deleteReview(userId, movieId).subscribe(() => {
                    this.notificationService.showSnackBarNotification('Pomyślnie usunięto recenzje', 'Zamknij', SnackBarStyle.success);
                    this.getAllReviews();
                });
            }
        });
    }
};
AdminReviewComponent = __decorate([
    Component({
        selector: 'admin-review',
        templateUrl: './admin-review.component.html',
        styleUrls: ['./admin-review.component.css'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ]
    })
], AdminReviewComponent);
export { AdminReviewComponent };
//# sourceMappingURL=admin-review.component.js.map