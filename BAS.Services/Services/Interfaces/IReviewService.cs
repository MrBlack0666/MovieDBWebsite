using System.Threading.Tasks;

namespace BAS.AppServices
{
    public interface IReviewService
    {
        Task<bool> InsertReview(InsertUpdateReviewDTO review);
        Task<bool> UpdateReview(InsertUpdateReviewDTO reviewDTO);
        Task<bool> DeleteReview(long userId, long movieId);
        Task<UserReviewListWithFilters> GetAllReviews(AllReviewsFiltersDTO reviewFilters);

        bool DidUserReviewMovie(long movieId);
    }
}
