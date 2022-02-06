import { IMovieInList } from './IMovieInList'

export interface IMovieListWithFilters {
    currentPage: number,
    pageSize: number,
    allPages: number,
    allElements: number,
    movieList: IMovieInList[]
}