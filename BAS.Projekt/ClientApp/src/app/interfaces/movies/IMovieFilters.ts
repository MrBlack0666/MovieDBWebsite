export interface IMovieFilters {
    title: string,
    releaseYearFrom: number|null,
    releaseYearTo: number|null,
    movieLengthFrom: number|null,
    movieLengthTo: number|null,
    avgRatingFrom: number|null,
    avgRatingTo: number|null,
    page: number,
    pageSize: number|null,
    orderBy: string,
    genreId: number
}