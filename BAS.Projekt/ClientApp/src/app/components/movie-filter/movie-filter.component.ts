import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IGenreList } from 'src/app/interfaces/genres/IGenreList';
import { IMovieFilters } from 'src/app/interfaces/movies/IMovieFilters';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {
  public movieFilters: IMovieFilters = {
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
  }
  public genresList: IGenreList[];

  @Output()
  public applyEvent = new EventEmitter();

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.genresService.getGenres().subscribe(data => this.genresList = data);
  }

  returnFilters(event) {
    this.movieFilters.page = 1;
    this.applyEvent.emit(this.movieFilters);
  }

}
