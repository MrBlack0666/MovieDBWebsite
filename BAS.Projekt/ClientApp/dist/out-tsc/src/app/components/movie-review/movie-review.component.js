import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
let MovieReviewComponent = class MovieReviewComponent {
    constructor(reviewService, authService) {
        this.reviewService = reviewService;
        this.authService = authService;
        this.reviewFormClose = new EventEmitter();
        this.reviewBody = new FormControl('', [Validators.maxLength(2000)]);
        this.reviewScore = '0';
        this.rating = 0;
        this.review = {
            userId: 0,
            movieId: 0,
            message: '',
            rating: 0
        };
    }
    ngOnInit() {
    }
    onHoverRatingChange(event) {
        if (event.hoverRating == 0) {
            this.reviewScore = this.rating.toString();
        }
        else {
            this.reviewScore = event.hoverRating;
        }
    }
    onRatingChange(event) {
        this.reviewScore = event.rating;
        this.rating = event.rating;
    }
    onReviewSubmit(event) {
        this.review.userId = this.authService.currentUserValue.id;
        this.review.movieId = this.movieId;
        this.review.message = this.reviewBody.value;
        this.review.rating = this.rating;
        this.reviewService.insertReview(this.review).subscribe(result => {
            if (result != false) {
                this.reviewFormClose.emit(result);
            }
            else {
                this.reviewFormClose.emit(result);
            }
        });
    }
    onCancelReview(event) {
        this.reviewFormClose.emit(false);
    }
};
__decorate([
    Output()
], MovieReviewComponent.prototype, "reviewFormClose", void 0);
__decorate([
    Input()
], MovieReviewComponent.prototype, "movieId", void 0);
MovieReviewComponent = __decorate([
    Component({
        selector: 'movie-review',
        templateUrl: './movie-review.component.html',
        styleUrls: ['./movie-review.component.css']
    })
], MovieReviewComponent);
export { MovieReviewComponent };
//# sourceMappingURL=movie-review.component.js.map