using BAS.AppCommon;
using BAS.AppServices;
using BAS.Projekt.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BAS.Projekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService reviewService;

        public ReviewController(IReviewService reviewService)
        {
            this.reviewService = reviewService;
        }

        [HttpPost]
        [BASAuthorize]
        public async Task<IActionResult> InsertReview([FromBody] InsertUpdateReviewDTO reviewDTO)
        {
            var result = await reviewService.InsertReview(reviewDTO);
            return Ok(result);
        }

        [HttpPut]
        [BASAuthorize]
        public async Task<IActionResult> UpdateReview([FromBody] InsertUpdateReviewDTO reviewDTO)
        {
            var result = await reviewService.UpdateReview(reviewDTO);
            return Ok(result);
        }

        [HttpDelete("{userId}/{movieId}")]
        [BASAuthorize]
        public async Task<IActionResult> DeleteReview([FromRoute] long userId, long movieId)
        {
            var result = await reviewService.DeleteReview(userId, movieId);
            return Ok(result);
        }

        [HttpGet("movie/{movieId}")]
        public IActionResult DidUserReviewMovie([FromRoute] long movieId)
        {
            var result = reviewService.DidUserReviewMovie(movieId);

            return Ok(result);
        }

        [HttpGet("all")]
        [BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> GetAllReviews([FromQuery] AllReviewsFiltersDTO filters)
        {
            var result = await reviewService.GetAllReviews(filters);
            return Ok(result);
        }

        [HttpGet("movie")]
        public async Task<IActionResult> GetMovieReviews([FromQuery] ReviewFiltersDTO filters)
        {
            var result = await reviewService.GetAllReviews(new AllReviewsFiltersDTO()
            {
                UserId = null,
                MovieId = filters.Id,
                OrderBy = filters.OrderBy,
                Page = filters.Page,
                PageSize = filters.PageSize
            });
            return Ok(result);
        }

        [HttpGet("user")]
        [BASAuthorize]
        public async Task<IActionResult> GetUserReviews([FromQuery] ReviewFiltersDTO filters)
        {
            var result = await reviewService.GetAllReviews(new AllReviewsFiltersDTO()
            {
                UserId = filters.Id,
                MovieId = null,
                OrderBy = filters.OrderBy,
                Page = filters.Page,
                PageSize = filters.PageSize
            });
            return Ok(result);
        }
    }
}
