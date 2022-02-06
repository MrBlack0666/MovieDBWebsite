using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public abstract class BaseFilter
    {
        public int Page { get; set; }
        public int? PageSize { get; set; }
        public string OrderBy { get; set; }
    }
}
