using System.Collections.Generic;

namespace BAS.AppServices
{
    public class GenreListWithFilters : BaseReturnedListWithFilters
    {
        public List<GenreInListDTO> GenreList { get; set; }
    }
}
