using System.Collections.Generic;

namespace BAS.AppServices
{
    public class UserReviewListWithFilters : BaseReturnedListWithFilters
    {
        public List<UserReviewInListDTO> ReviewList { get; set; }
    }
}
