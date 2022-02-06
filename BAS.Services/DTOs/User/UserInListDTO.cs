using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAS.AppServices.DTOs.User
{
    public class UserInListDTO
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
    }
}
