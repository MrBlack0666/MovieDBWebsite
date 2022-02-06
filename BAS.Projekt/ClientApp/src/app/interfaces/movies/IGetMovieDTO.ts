import { IFile } from './IFile';
import { IGenreInMovieDTO } from '../genres/IGenreInMovieDTO';
import { IPersonnelInMovieDTO } from '../personnel/IPersonnelInMovieDTO';

export interface IGetMovieDTO {
    id: number,
    title: string,
    description: string,
    releaseYear: number,
    movieLengthInMinutes: number,
    averageRating: number,
    moviePoster: IFile
    genres: IGenreInMovieDTO[],
    personnel: IPersonnelInMovieDTO[],
}