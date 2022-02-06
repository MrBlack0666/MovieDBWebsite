using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public interface IUserService
    {
        Task ChangeUserRole(long userId, string roleId);
        Task<List<IdentityRole<long>>> GetRoles();
        Task<bool> DoesUserExist(long id);
        Task<string> GetUsername(long id);
        Task<UserDTO> GetUser(long id);
        Task<UserRoleListWithFilters> GetUsersWithRoles(UserFilters userFilters);
        Task<UserNameRole> GetUserNameRole(long id);
        Task<bool> DeleteUser(long id);
        List<UserInSelectDTO> GetUsersToSelect(SelectUsersFiltersDTO filters);
    }
}