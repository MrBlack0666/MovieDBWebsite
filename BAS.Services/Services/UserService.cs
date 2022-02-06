using BAS.AppCommon;
using BAS.AppServices.DTOs.User;
using BAS.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BAS.AppServices
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole<long>> roleManager;

        public UserService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<long>> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task ChangeUserRole(long userId, string role)
        {
            var roleId = 2;
            if (role.Equals("Admin"))
            {
                roleId = 1;
            }

            var user = await userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                throw new BASNotFoundException("User not found");
            }

            var oldRole = await userManager.GetRolesAsync(user);
            var newRole = await roleManager.FindByIdAsync(roleId.ToString());
            await userManager.RemoveFromRoleAsync(user, oldRole.FirstOrDefault().ToString());
            await userManager.AddToRoleAsync(user, newRole.Name);

            await userManager.UpdateSecurityStampAsync(user);
        }

        public async Task<List<IdentityRole<long>>> GetRoles()
        {
            var roles = await this.roleManager.Roles.ToListAsync();
            return roles;
        }

        public async Task<bool> DoesUserExist(long id)
        {
            return (await userManager.FindByIdAsync(id.ToString())) != null;
        }

        public async Task<string> GetUsername(long id)
        {
            var user = await userManager.FindByIdAsync(id.ToString());

            if (user == null)
                return "Gal Anonim";

            return user.UserName;
        }

        public async Task<UserDTO> GetUser(long id)
        {
            var user = await this.userManager.FindByIdAsync(id.ToString());

            var result = new UserDTO
            {
                Email = user.Email,
            };

            return result;
        }

        public async Task<bool> DeleteUser(long id)
        {
            var user = await this.userManager.FindByIdAsync(id.ToString());
            var result = userManager.DeleteAsync(user);
            return true;
        }

        public async Task<UserRoleListWithFilters> GetUsersWithRoles(UserFilters userFilters)
        {
            var userRoleListWithFilters = new UserRoleListWithFilters();
            var result = new List<UserInListDTO>();
            var sizeList = new List<UserInListDTO>();
            var index = 0;

            if (string.IsNullOrWhiteSpace(userFilters.UserName))
            {
                userFilters.UserName = "";
            }

            if (string.IsNullOrWhiteSpace(userFilters.OrderBy))
            {
                userFilters.OrderBy = "";
            }

            foreach (var user in userManager.Users.ToList())
            {
                var roles = await userManager.GetRolesAsync(user);

                var userInListDTO = new UserInListDTO
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Role = roles.FirstOrDefault()
                };
                result.Add(userInListDTO);
            }

            if(userFilters.UserName != "")
            {
                result.RemoveAll(u => (!u.Username.Contains(userFilters.UserName)));
            }

            switch (userFilters.OrderBy.ToLower())
            {
                case "usernameasc":
                    result.Sort(delegate (UserInListDTO x, UserInListDTO y)
                    {
                        return x.Username.CompareTo(y.Username);
                    });
                    break;
                case "usernamedesc":
                    result.Sort(delegate (UserInListDTO x, UserInListDTO y)
                    {
                        return y.Username.CompareTo(x.Username);
                    });
                    break;
                case "roleasc":
                    result.Sort(delegate (UserInListDTO x, UserInListDTO y)
                    {
                        return x.Role.CompareTo(y.Role);
                    });
                    break;
                case "roledesc":
                    result.Sort(delegate (UserInListDTO x, UserInListDTO y)
                    {
                        return y.Role.CompareTo(x.Role);
                    });
                    break;
                default:
                    break;
            }

            userRoleListWithFilters.CurrentPage = userFilters.Page;
            userRoleListWithFilters.PageSize = (int)userFilters.PageSize;
            userRoleListWithFilters.AllElements = result.Count;
            userRoleListWithFilters.AllPages = 1;

            foreach (UserInListDTO row in result)
            {
                if(((userFilters.Page-1) * userFilters.PageSize) <= index && (((userFilters.Page - 1) * userFilters.PageSize) + userFilters.PageSize) > index)
                {
                    sizeList.Add(row);
                }
                index++;
            }

            result = sizeList;
            userRoleListWithFilters.RoleList = result.ToList();

            return userRoleListWithFilters;
        }

        public async Task<UserNameRole> GetUserNameRole(long id)
        {
            var user = await userManager.FindByIdAsync(id.ToString());
            var roles = await userManager.GetRolesAsync(user);

            var result = new UserNameRole
            {
                UserName = user.UserName,
                Role = roles.FirstOrDefault()
            };

            return result;
        }

        public List<UserInSelectDTO> GetUsersToSelect(SelectUsersFiltersDTO filters)
        {
            if(string.IsNullOrEmpty(filters.StartsWith))
            {
                filters.StartsWith = "";
            }

            return userManager.Users.Where(u => u.UserName.StartsWith(filters.StartsWith))
                .OrderBy(u => u.UserName)
                .Take(5)
                .Select(u => new UserInSelectDTO()
                {
                    Id = u.Id,
                    Username = u.UserName
                }).ToList();
        }
    }
}
