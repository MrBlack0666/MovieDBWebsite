import { NotificationService } from './../../services/notification.service';
import { DeleteReviewDialogComponent } from './../dialogs/delete-review-dialog/delete-review-dialog.component';
import { IUserReviewInListDTO } from './../../interfaces/reviews/IUserReviewInListDTO';
import { IUserReviewListWithFilters } from './../../interfaces/reviews/IUserReviewListWithFilters';
import { ReviewService } from './../../services/review.service';
import { MoviesService } from 'src/app/services/movies.service';
import { IMovieInSelectDTO } from './../../interfaces/movies/IMovieInSelectDTO';
import { IUserInSelectDTO } from './../../interfaces/user/IUserInSelectDTO';
import { UserService } from 'src/app/services/user.service';
import { IAllReviewFilters } from './../../interfaces/reviews/IAllReviewFilters';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';

@Component({
  selector: 'admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminReviewComponent implements OnInit {
  reviewFilter: IAllReviewFilters = {
    userId: null,
    movieId: null,
    page: 1,
    pageSize: 10,
    orderBy: 'movieasc'
  };
  reviews: IUserReviewListWithFilters = {
    currentPage: 1,
    pageSize: 10,
    allPages: 0,
    allElements: 0,
    reviewList: []
  } 

  userInput = new FormControl();
  selectedUser: IUserInSelectDTO;
  usersInDropdown: IUserInSelectDTO[] = [];
  movieInput = new FormControl();
  selectedMovie: IMovieInSelectDTO;
  moviesInDropdown: IMovieInSelectDTO[] = [];

  isLoading: boolean = true;
  displayedColumns: string[] = ['movieTitle', 'username', 'rating', 'action'];
  pageIndex: number;
  expandedElement: IUserReviewInListDTO | null;

  constructor(private userService: UserService,
      private movieService: MoviesService,
      private reviewService: ReviewService,
      public dialog: MatDialog,
      private notificationService: NotificationService) { }

  ngOnInit() {
    this.getUsersToSelect('');
    this.getMoviesToSelect('');
    this.getAllReviews();
  }

  async getUsersToSelect(startsWith: string) {
    this.usersInDropdown = await this.userService.getUsersToSelect(startsWith);
  }

  async getMoviesToSelect(startsWith: string) {
    this.moviesInDropdown = await this.movieService.getMoviesToSelect(startsWith);
  }

  getAllReviews() {
    this.reviewService.getAllReviews(this.reviewFilter).subscribe(data => {
      this.reviews = data;
      this.isLoading = false;
    })
  }

  getUserFromDropdown(username: string) {
    return this.usersInDropdown.find(user => user.username == username);
  }

  getMovieFromDropdown(title: string) {
    return this.moviesInDropdown.find(movie => movie.title == title);
  }

  selectUser(event: MatAutocompleteSelectedEvent): void {
    let user = this.getUserFromDropdown(event.option.viewValue)
    this.selectedUser = user;
  }

  selectMovie(event: MatAutocompleteSelectedEvent): void {
    let movie = this.getMovieFromDropdown(event.option.viewValue)
    this.selectedMovie = movie;
  }

  async onUserInputChange(startsWith) {
    this.getMoviesToSelect(startsWith);
  }

  async onMovieInputChange(startsWith) {
    this.getMoviesToSelect(startsWith);
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

  async expandReviewDetails(element) {

    if(this.expandedElement === element) {
      this.expandedElement = null;
    }
    else {
        this.expandedElement = element;
    }
  }

  onApplyFilters(event) {
    this.reviewFilter.movieId = this.selectedMovie?.id;
    this.reviewFilter.userId = this.selectedUser?.id;
    this.getAllReviews();
  }

  openDeleteDialog(userId, movieId) {
    const dialogRef = this.dialog.open(DeleteReviewDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.reviewService.deleteReview(userId, movieId).subscribe(() => {
          this.notificationService.showSnackBarNotification('Pomyślnie usunięto recenzje', 'Zamknij', SnackBarStyle.success);
          this.getAllReviews();
        })
      }
    });
  }
}
