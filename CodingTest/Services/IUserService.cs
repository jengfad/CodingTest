using CodingTest.Models.Data;
using CodingTest.Models.Dto;

namespace CodingTest.Services
{
    public interface IUserService
    {
        PagedUsersDto GetPagedUsers(UserFilter filter);
        UserDto GetUser(int id);
        UserDto GetUserByEmail(string email);
        void AddUser(UserDto dto);
        void UpdateUser(UserDto dto);
        void DeleteUser(int id);
    }
}
