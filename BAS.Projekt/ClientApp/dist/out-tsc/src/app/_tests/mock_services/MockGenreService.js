import { __awaiter } from "tslib";
import { GenresService } from './../../services/genres.service';
import { of } from 'rxjs';
export class MockGenreService extends GenresService {
    constructor() {
        super(...arguments);
        this.genreList = [
            {
                id: 1,
                name: "Gangsterski",
                description: ""
            },
            {
                id: 2,
                name: "Akcji",
                description: ""
            },
            {
                id: 3,
                name: "Komedia",
                description: ""
            },
            {
                id: 4,
                name: "Przygodowy",
                description: ""
            },
            {
                id: 5,
                name: "Thriller",
                description: ""
            },
            {
                id: 6,
                name: "Test",
                description: ""
            }
        ];
    }
    //private url = `${environment.apiUrl}/api/Genre`;
    //constructor(private http: HttpClient) { }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let genre = this.genreList.find(g => g.id);
            let returnedGenre = { id: genre.id, name: genre.name, description: genre.description };
            return of(returnedGenre).toPromise();
        });
    }
    getGenres() {
        return of(this.genreList);
    }
    /*getGenresByName(genre: IGenreFilters): Observable<IGenreListWithFilters> {
        let tempGenreList = this.genreList.filter(m => (movieFilters.avgRatingFrom === null || m.averageRating >= movieFilters.avgRatingFrom) &&
        (movieFilters.avgRatingTo === null || m.averageRating <= movieFilters.avgRatingTo) &&
        (movieFilters.releaseYearFrom === null || m.releaseYear >= movieFilters.releaseYearFrom) &&
        (movieFilters.releaseYearTo === null || m.releaseYear <= movieFilters.releaseYearTo) &&
        (movieFilters.movieLengthFrom === null || m.movieLengthInMinutes >= movieFilters.movieLengthFrom) &&
        (movieFilters.movieLengthTo === null || m.movieLengthInMinutes <= movieFilters.movieLengthTo) &&
        m.name.indexOf(movieFilters.title) >= 0);


        let tempPageSize = (movieFilters.pageSize === null || movieFilters.pageSize <= 0) ? 10000 : movieFilters.pageSize;
        let returnedList: IMovieListWithFilters = {
            currentPage: movieFilters.page,
            pageSize: tempPageSize,
            allPages: Math.ceil(tempMovieList.length / tempPageSize),
            allElements: tempMovieList.length,
            movieList: tempMovieList.slice(0, tempPageSize)
        };

        return of(returnedList);
    }*/
    deleteGenre(id) {
        if (id > 0)
            return of(true);
        return of(false);
    }
    editGenre(genre) {
        return of(true);
    }
    addGenre(genre) {
        return of(true);
    }
}
//# sourceMappingURL=MockGenreService.js.map