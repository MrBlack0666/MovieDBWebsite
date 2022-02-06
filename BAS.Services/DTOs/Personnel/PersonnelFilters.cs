using System;

namespace BAS.AppServices
{
    public class PersonnelFilters : BaseFilter
    {
        public string FullName { get; set; }
        public string Nationality { get; set; }
        public DateTime? BirthDateFrom { get; set; }
        public DateTime? BirthDateTo { get; set; }
    }
}
