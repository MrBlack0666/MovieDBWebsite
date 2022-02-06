using BAS.Database;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public interface IGenreService
    {
        Task<bool> InsertGenre(GenreDTO genre);
        Task<bool> UpdateGenre(GenreDTO genre);
        Task<bool> DeleteGenre(long id);
        Task<Genre> GetGenre(long id);
        Task<GenreListWithFilters> GetGenresByName(GetGenresFiltersDTO genreFilter);
        Task<bool> IsGenreInDB(long id);
        List<GenreInListDTO> GetGenres();
    }
}