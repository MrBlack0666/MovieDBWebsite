using BAS.AppCommon;
using BAS.AppServices;
using BAS.Projekt.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BAS.Projekt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService genreService;

        public GenreController(IGenreService genreService)
        {
            this.genreService = genreService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenre([FromRoute] long id)
        {
            var genre = await genreService.GetGenre(id);
            return Ok(genre);
        }

        [HttpGet("all")]
        public IActionResult GetGenres()
        {
            var result = genreService.GetGenres();
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetGenresByName([FromQuery] GetGenresFiltersDTO genreFilter)
        {
            var genres = await genreService.GetGenresByName(genreFilter);
            return Ok(genres);
        }

        [HttpPost]
        [BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> InsertGenre([FromForm] GenreDTO genre)
        {
            var result = await genreService.InsertGenre(genre);
            return Ok(result);
        }

        [HttpPut]
        //[BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> UpdateGenre([FromForm] GenreDTO genre)
        {
            
            var result = await genreService.UpdateGenre(genre);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        //[BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> DeleteGenre([FromRoute] long id)
        {
            var result = await genreService.DeleteGenre(id);
            return Ok(result);
        }
    }
}
