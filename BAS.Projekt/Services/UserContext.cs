using BAS.AppCommon;
using BAS.Services;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace BAS.Projekt.Services
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public long? UserAccountId
        { 
            get
            {
                var value = this.httpContextAccessor.HttpContext.User.FindFirst(StaticValues.JWTUserAccountIdClaim)?.Value;
                if (!string.IsNullOrEmpty(value))
                {
                    var parseResult = long.TryParse(value, out long userId);
                    if (parseResult)
                    {
                        return userId;
                    }
                }

                return null;
            }
        }

        public bool IsAuthenticated
        {
            get
            {
                return this.httpContextAccessor.HttpContext.User.Identity.IsAuthenticated;
            }
        }

        public bool IsInRole(UserRole role)
        {
            var roles = this.httpContextAccessor.HttpContext.User.FindAll(StaticValues.JWTRoleClaim);
            return roles.Select(x => x.Value).Contains(role.ToString());
        }
    }
}
