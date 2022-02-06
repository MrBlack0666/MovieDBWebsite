import { IGetMovieDTO } from './../../interfaces/movies/IGetMovieDTO';
import { NumberFormatStyle } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IMovieDTO } from 'src/app/interfaces/movies/IMovieDTO';
import { IMovieFilters } from 'src/app/interfaces/movies/IMovieFilters';
import { IMovieInList } from 'src/app/interfaces/movies/IMovieInList';
import { IMovieInSelectDTO } from 'src/app/interfaces/movies/IMovieInSelectDTO';
import { IMovieListWithFilters } from 'src/app/interfaces/movies/IMovieListWithFilters';
import { MoviesService } from './../../services/movies.service';

export class MockMovieService extends MoviesService {
    private movieList: IMovieInList[] = [
        {
            id: 1,
            title: "Pulp Fiction",
            releaseYear: 2000,
            movieLengthInMinutes: 200,
            averageRating: 6.5,
            poster: null,
            posterName: "",
            genres: ["Gangsterski", "Akcji"]
        },
        {
            id: 2,
            title: "Pulpet",
            releaseYear: 2022,
            movieLengthInMinutes: 55,
            averageRating: 1.7,
            poster: null,
            posterName: "",
            genres: ["Przygodowy", "Komedia", "Thriller"]
        },
        {
            id: 3,
            title: "Test 1",
            releaseYear: 1940,
            movieLengthInMinutes: 240,
            averageRating: 9.8,
            poster: null,
            posterName: "",
            genres: ["Thriller", "Akcji"]
        },
        {
            id: 4,
            title: "Test 2",
            releaseYear: 2011,
            movieLengthInMinutes: 145,
            averageRating: 5.5,
            poster: null,
            posterName: "",
            genres: ["Przygodowy", "Test"]
        },
        {
            id: 5,
            title: "Test 3",
            releaseYear: 1955,
            movieLengthInMinutes: 50,
            averageRating: 4.3,
            poster: null,
            posterName: "",
            genres: ["Test", "Akcji"]
        },
        {
            id: 6,
            title: "Test 4",
            releaseYear: 1977,
            movieLengthInMinutes: 100,
            averageRating: 3.2,
            poster: null,
            posterName: "",
            genres: ["Akcji"]
        }
    ];

    getMovies(movieFilters: IMovieFilters): Observable<IMovieListWithFilters> {
        let tempMovieList = this.movieList.filter(m => (movieFilters.avgRatingFrom === null || m.averageRating >= movieFilters.avgRatingFrom) &&
        (movieFilters.avgRatingTo === null || m.averageRating <= movieFilters.avgRatingTo) &&
        (movieFilters.releaseYearFrom === null || m.releaseYear >= movieFilters.releaseYearFrom) &&
        (movieFilters.releaseYearTo === null || m.releaseYear <= movieFilters.releaseYearTo) &&
        (movieFilters.movieLengthFrom === null || m.movieLengthInMinutes >= movieFilters.movieLengthFrom) &&
        (movieFilters.movieLengthTo === null || m.movieLengthInMinutes <= movieFilters.movieLengthTo) &&
        m.title.indexOf(movieFilters.title) >= 0);


        let tempPageSize = (movieFilters.pageSize === null || movieFilters.pageSize <= 0) ? 10000 : movieFilters.pageSize;
        let returnedList: IMovieListWithFilters = {
            currentPage: movieFilters.page,
            pageSize: tempPageSize,
            allPages: Math.ceil(tempMovieList.length / tempPageSize),
            allElements: tempMovieList.length,
            movieList: tempMovieList.slice(0, tempPageSize)
        };

        return of(returnedList); 
    }
    
    deleteMovie(id: number): Observable<any> {
        if(id > 0)
            return of(true);
        return of(false);
    }
    
    editMovie(movie: IMovieDTO): Observable<any> {
        return of(true);    
    }
    
    addMovie(movie: IMovieDTO): Observable<any> {
        return of(true);
    }
    
    async getMovie(id: number) {
        let movie = this.movieList.find(m => m.id === id);
        let returnedMovie: IGetMovieDTO = { 
            id: movie.id,
            title: movie.title,
            description: "",
            releaseYear: movie.releaseYear,
            movieLengthInMinutes: movie.movieLengthInMinutes,
            averageRating: movie.averageRating,
            moviePoster: null,
            genres: [],
            personnel: []
        }
        return await of(returnedMovie).toPromise();
    }
    
    async getMoviesToSelect(startsWith: string) {
        let movies = this.movieList.filter(m => startsWith === null || startsWith === undefined || startsWith === "" || m.title.startsWith(startsWith))
        .map(m => <IMovieInSelectDTO>{ id: m.id, title: m.title}).slice(0, 5);
    
        return await of(movies).toPromise();
     }
    
    getRecommendations(userAccountId: number, page: number, pageSize: number) {
        let movies = this.movieList.slice(0, 5);

        return of(movies);
    }
}