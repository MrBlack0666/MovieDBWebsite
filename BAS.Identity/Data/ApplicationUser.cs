using Microsoft.AspNetCore.Identity;

namespace BAS.Identity
{
    public class ApplicationUser : IdentityUser<long>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
