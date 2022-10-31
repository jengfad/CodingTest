using CodingTest.Models.Dto;

namespace CodingTest.Services
{
    public interface IUserService
    {
        PagedUsersDto GetPagedUsers(int pageNumber, int pageSize, string searchText);
        UserDto GetUser(int id);
        void AddUser(UserDto dto);
        void UpdateUser(UserDto dto);
        void DeleteUser(int id);
    }
}
