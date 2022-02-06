using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public class PersonnelSelectFilter
    {
        public int NumberOfItems { get; set; }
        public string FullName { get; set; }
        public long[] SkipPersonnelList { get; set; }
    }
}
