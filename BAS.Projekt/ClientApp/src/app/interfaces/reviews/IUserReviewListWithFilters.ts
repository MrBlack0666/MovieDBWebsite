import { IUserReviewInListDTO } from './IUserReviewInListDTO';
export interface IUserReviewListWithFilters {
    currentPage: number;
    pageSize: number;
    allPages: number;
    allElements: number;
    reviewList: IUserReviewInListDTO[];
}