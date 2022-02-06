import { FilmCrew } from "../FilmCrew";

export interface IPersonnelInMovieDTO {
    movieId: number,
    personId: number,
    memberPosition: FilmCrew,
    name: string,
    surname: string
}