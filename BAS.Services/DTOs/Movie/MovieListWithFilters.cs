using System.Collections.Generic;

namespace BAS.AppServices
{
    public class MovieListWithFilters : BaseReturnedListWithFilters
    {
        public List<MovieInListDTO> MovieList { get; set; }
    }
}
