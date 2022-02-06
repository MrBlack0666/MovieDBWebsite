import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IInsertUpdateReview } from 'src/app/interfaces/reviews/IInsertUpdateReview';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {

  @Output()
  reviewFormClose: EventEmitter<boolean>;

  @Input()
  movieId: number;
  review: IInsertUpdateReview;

  reviewBody: FormControl;
  reviewScore: string;
  rating: number;

  constructor(private reviewService: ReviewService, private authService: AuthService) {
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

  ngOnInit(): void {

  }

  onHoverRatingChange(event) {
    if(event.hoverRating == 0) {
      this.reviewScore = this.rating.toString();
    } else {
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
      if(result != false) {
        this.reviewFormClose.emit(result);
      } else {
        this.reviewFormClose.emit(result);
      }
    });
  }

  onCancelReview(event) {
    this.reviewFormClose.emit(false);
  }
}
