using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public class AllReviewsFiltersDTO : BaseFilter
    {
        public long? UserId { get; set; }
        public long? MovieId { get; set; }
    }
}
