import { IFile } from './IFile'

export interface IMovieInList {
    id: number,
    title: string,
    releaseYear: number,
    movieLengthInMinutes: number,
    averageRating: number,
    poster: IFile,
    posterName: string,
    genres: any[]   
}