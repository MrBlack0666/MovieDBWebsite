using BAS.AppCommon;
using BAS.AppServices;
using BAS.Projekt.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BAS.Projekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService movieService;

        public MovieController(IMovieService movieService)
        {
            this.movieService = movieService;
        }

        [HttpPost]
        [BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> InsertMovie([FromForm] InsertUpdateMovieDTO movieDTO)
        {
            var result = await movieService.InsertMovie(movieDTO);
            return Ok(result);
        }

        [HttpPut]
        [BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> UpdateMovie([FromForm] InsertUpdateMovieDTO movieDTO)
        {
            var result = await movieService.UpdateMovie(movieDTO);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> DeleteMovie([FromRoute] long id)
        {
            var result = await movieService.DeleteMovie(id);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovie([FromRoute] long id)
        {
            var result = await movieService.GetMovie(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetMoviesWithFilters([FromQuery] MovieFilters filters)
        {
            var result = await movieService.GetMovieWithFilters(filters);
            return Ok(result);
        }

        [HttpGet("select")]
        public async Task<IActionResult> GetMoviesToSelect([FromQuery] SelectUsersFiltersDTO filters)
        {
            var result = movieService.GetMoviesToSelect(filters);
            return Ok(result);
        }

        [HttpGet("recommendations")]
        //[BASAuthorize]
        public async Task<IActionResult> GetMoviesForRecommendations([FromQuery] RecommendationFiltersDTO filters)
        {
            var result = await movieService.GetRecommendations(filters);
            return Ok(result);
        }

        //[HttpGet("Reviews")]
        //public async Task<IActionResult> GetMovieReviews([FromBody] ReviewFiltersDTO filters)
        //{
        //    var result = await movieService.GetMovieReviews(filters);
        //    return Ok(result);
        //}

        #region AlternativeMethods
        [HttpGet("{id}/Genres")]
        public async Task<IActionResult> GetMovieGenres([FromRoute] long id)
        {
            var result = await movieService.GetMovieGenres(id);
            return Ok(result);
        }

        [HttpGet("{id}/Personnel")]
        public async Task<IActionResult> GetMoviePersonnel([FromRoute] long id)
        {
            var result = await movieService.GetMoviePersonnel(id);
            return Ok(result);
        }

        [HttpGet("{id}/Poster")]
        public async Task<IActionResult> GetMoviePoster([FromRoute] long id)
        {
            var result = await movieService.GetMoviePoster(id);
            return Ok(result);
        }
        #endregion
    }
}
