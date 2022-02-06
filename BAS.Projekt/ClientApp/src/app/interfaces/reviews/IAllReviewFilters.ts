export interface IAllReviewFilters {
    userId: number | null;
    movieId: number | null;
    page: number;
    pageSize: number | null;
    orderBy: string;
}