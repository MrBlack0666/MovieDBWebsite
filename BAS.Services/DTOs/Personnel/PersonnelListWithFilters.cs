using BAS.Database;
using System.Collections.Generic;

namespace BAS.AppServices
{
    public class PersonnelListWithFilters : BaseReturnedListWithFilters
    {
        public List<Personnel> PersonnelList { get; set; }
    }
}
