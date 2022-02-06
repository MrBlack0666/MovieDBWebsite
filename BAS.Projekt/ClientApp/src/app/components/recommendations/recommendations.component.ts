import { Component, Input, OnInit } from '@angular/core';
import { logging } from 'selenium-webdriver';
import { User } from 'src/app/interfaces/auth/user';
import { IFile } from 'src/app/interfaces/movies/IFile';
import { IMovieInList } from 'src/app/interfaces/movies/IMovieInList';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  private userAccountId: number;
  private page: number;
  private pageSize: number;
  private currentUser: User;
  movieList: IMovieInList[];
  apiError: boolean = false;
  isLoading: boolean = true;

  constructor(private authService: AuthService, private movieService: MoviesService) {
    this.userAccountId = 0;
    this.page = 1;
    this.pageSize = 5;
    this.authService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {
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

  getMoviePoster(poster: IFile) {
    if(poster != null) {
      return `data:${poster.contentType};base64,${poster.file}`;
    }
    else {
      return '/assets/images/noMovieImage.png';
    }
  }
}
