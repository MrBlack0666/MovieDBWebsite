using BAS.AppServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BAS.Projekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IUserService userService;

        public RoleController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersWithRoles([FromQuery] UserFilters filters)
        {
            var result = await userService.GetUsersWithRoles(filters);
            return Ok(result);
        }

        [HttpGet("Roles")]
        public async Task<IActionResult> GetRoles()
        {
            var result = await userService.GetRoles();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SetRole([FromForm] UpdateUserRoleDTO updateUserRoleDTO)
        {
            await userService.ChangeUserRole(updateUserRoleDTO.Id, updateUserRoleDTO.Role);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] long id)
        {
            var result = await userService.DeleteUser(id);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserName([FromRoute] long id)
        {
            var result = await userService.GetUserNameRole(id);
            return Ok(result);
        }

        [HttpGet("select")]
        public async Task<IActionResult> GetUsersToSelect([FromQuery] SelectUsersFiltersDTO filters)
        {
            var result = userService.GetUsersToSelect(filters);
            return Ok(result);
        }
    }
}
