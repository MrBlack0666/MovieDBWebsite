using BAS.AppCommon;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace BAS.Projekt.Attributes
{
    public class BASAuthorizeAttribute : AuthorizeAttribute
    {
        public BASAuthorizeAttribute(params UserRole[] roles)
        {
            if (roles.Any())
            {
                var rolesText = string.Join(",", roles.Select(x => x.ToString()));
                this.Roles = rolesText;
            }
        }
    }
}
