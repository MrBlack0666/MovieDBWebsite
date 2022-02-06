using System.Collections.Generic;

namespace BAS.AppServices
{
    public class MovieReviewListWithFilters : BaseReturnedListWithFilters
    {
        public List<MovieReviewInListDTO> ReviewList { get; set; }
    }
}
