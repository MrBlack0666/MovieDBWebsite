import { IGenre } from './IGenre';

export interface IGenreListWithFilters {
    currentPage: number,
    pageSize: number,
    allPages: number,
    allElements: number,
    genreList: IGenre[]
}