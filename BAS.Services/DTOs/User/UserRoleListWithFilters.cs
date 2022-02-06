using BAS.AppServices.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public class UserRoleListWithFilters : BaseReturnedListWithFilters
    {
        public List<UserInListDTO> RoleList { get; set; }
    }
}
