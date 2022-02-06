import { IInsertMovieCrewDTO } from "../personnel/IInsertMovieCrewDTO";

export interface IMovieDTO {
    id: number,
    title: string,
    description: string,
    releaseYear: number,
    movieLengthInMinutes: number,
    file: File,
    updatePhoto: boolean,
    crew: IInsertMovieCrewDTO[],
    genres: number[] 
}