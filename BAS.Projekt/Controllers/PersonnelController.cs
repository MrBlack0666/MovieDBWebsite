using BAS.AppCommon;
using BAS.AppServices;
using BAS.Projekt.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BAS.Projekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonnelController : ControllerBase
    {
        private readonly IPersonnelService personnelService;

        public PersonnelController(IPersonnelService personnelService)
        {
            this.personnelService = personnelService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersonnel([FromRoute] long id)
        {
            var personnel = await personnelService.GetPersonnel(id);
            return Ok(personnel);
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonnelList([FromQuery] PersonnelFilters personnelFilters)
        {
            var personnelList = await personnelService.GetPersonnelWtihFilter(personnelFilters);
            return Ok(personnelList);
        }

        [HttpGet("select")]
        public async Task<IActionResult> GetPersonnelToSelect([FromQuery] PersonnelSelectFilter filters)
        {
            var personnelList = personnelService.GetPersonnelToSelect(filters);
            return Ok(personnelList);
        }

        [HttpPost]
        //[BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> InsertPersonnel([FromForm] PersonnelDTO personnel)
        {
            var result = await personnelService.InsertPersonnel(personnel);
            return Ok(result);
        }

        [HttpPut]
        //[BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> UpdatePersonnel([FromForm] PersonnelDTO personnelDTO)
        {

            var result = await personnelService.UpdatePersonnel(personnelDTO);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        //[BASAuthorize(UserRole.Admin)]
        public async Task<IActionResult> DeletePersonnel([FromRoute] long id)
        {
            var result = await personnelService.DeletePersonnel(id);
            return Ok(result);
        }
    }
}
