using CodingTest.Models.Dto;
using CodingTest.Services;
using Microsoft.AspNetCore.Mvc;

namespace CodingTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PagedUsersDto>> Get(
            [FromQuery]int pageNumber, [FromQuery] int pageSize, [FromQuery] string? searchText = null)
        {
            var result = _userService.GetPagedUsers(pageNumber, pageSize, searchText);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> Get(int id)
        {
            var result = _userService.GetUser(id);
            return Ok(result);
        }

        [HttpGet("email/{email}")]
        public ActionResult<UserDto> GetByEmail(string email)
        {
            var result = _userService.GetUserByEmail(email);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _userService.DeleteUser(id);
            return Ok();
        }

        [HttpPost]
        public ActionResult Post(UserDto userDto)
        {
            _userService.AddUser(userDto);
            return Ok();
        }

        [HttpPut]
        public ActionResult Put(UserDto userDto)
        {
            _userService.UpdateUser(userDto);
            return Ok();
        }
    }
}
