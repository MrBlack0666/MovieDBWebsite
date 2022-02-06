import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RecommendationsComponent = class RecommendationsComponent {
    constructor(authService, movieService) {
        this.authService = authService;
        this.movieService = movieService;
        this.apiError = false;
        this.isLoading = true;
        this.userAccountId = 0;
        this.page = 1;
        this.pageSize = 5;
        this.authService.currentUser.subscribe(res => {
            this.currentUser = res;
        });
    }
    ngOnInit() {
        this.getRecommendations();
    }
    getRecommendations() {
        this.userAccountId = this.currentUser.id;
        this.movieService.getRecommendations(this.userAccountId, this.page, this.pageSize).subscribe(result => {
            console.log(result);
            this.movieList = result;
            this.isLoading = false;
        }, error => {
            this.movieList = [];
            this.apiError = true;
            this.isLoading = false;
        });
    }
    getMoviePoster(poster) {
        if (poster != null) {
            return `data:${poster.contentType};base64,${poster.file}`;
        }
        else {
            return '/assets/images/noMovieImage.png';
        }
    }
};
RecommendationsComponent = __decorate([
    Component({
        selector: 'recommendations',
        templateUrl: './recommendations.component.html',
        styleUrls: ['./recommendations.component.css']
    })
], RecommendationsComponent);
export { RecommendationsComponent };
//# sourceMappingURL=recommendations.component.js.map