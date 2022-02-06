using System.Collections.Generic;

namespace BAS.AppServices
{
    public class RecommendationsDTO
    {
        public List<long> MovieIds { get; set; }
        public long Total { get; set; }
    }
}
