import { __awaiter } from "tslib";
import { of } from 'rxjs';
import { MoviesService } from './../../services/movies.service';
export class MockMovieService extends MoviesService {
    constructor() {
        super(...arguments);
        this.movieList = [
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
    }
    getMovies(movieFilters) {
        let tempMovieList = this.movieList.filter(m => (movieFilters.avgRatingFrom === null || m.averageRating >= movieFilters.avgRatingFrom) &&
            (movieFilters.avgRatingTo === null || m.averageRating <= movieFilters.avgRatingTo) &&
            (movieFilters.releaseYearFrom === null || m.releaseYear >= movieFilters.releaseYearFrom) &&
            (movieFilters.releaseYearTo === null || m.releaseYear <= movieFilters.releaseYearTo) &&
            (movieFilters.movieLengthFrom === null || m.movieLengthInMinutes >= movieFilters.movieLengthFrom) &&
            (movieFilters.movieLengthTo === null || m.movieLengthInMinutes <= movieFilters.movieLengthTo) &&
            m.title.indexOf(movieFilters.title) >= 0);
        let tempPageSize = (movieFilters.pageSize === null || movieFilters.pageSize <= 0) ? 10000 : movieFilters.pageSize;
        let returnedList = {
            currentPage: movieFilters.page,
            pageSize: tempPageSize,
            allPages: Math.ceil(tempMovieList.length / tempPageSize),
            allElements: tempMovieList.length,
            movieList: tempMovieList.slice(0, tempPageSize)
        };
        return of(returnedList);
    }
    deleteMovie(id) {
        if (id > 0)
            return of(true);
        return of(false);
    }
    editMovie(movie) {
        return of(true);
    }
    addMovie(movie) {
        return of(true);
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let movie = this.movieList.find(m => m.id === id);
            let returnedMovie = {
                id: movie.id,
                title: movie.title,
                description: "",
                releaseYear: movie.releaseYear,
                movieLengthInMinutes: movie.movieLengthInMinutes,
                averageRating: movie.averageRating,
                moviePoster: null,
                genres: [],
                personnel: []
            };
            return yield of(returnedMovie).toPromise();
        });
    }
    getMoviesToSelect(startsWith) {
        return __awaiter(this, void 0, void 0, function* () {
            let movies = this.movieList.filter(m => startsWith === null || startsWith === undefined || startsWith === "" || m.title.startsWith(startsWith))
                .map(m => ({ id: m.id, title: m.title })).slice(0, 5);
            return yield of(movies).toPromise();
        });
    }
    getRecommendations(userAccountId, page, pageSize) {
        let movies = this.movieList.slice(0, 5);
        return of(movies);
    }
}
//# sourceMappingURL=MockMovieService.js.map