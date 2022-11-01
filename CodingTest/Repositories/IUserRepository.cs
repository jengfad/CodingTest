using CodingTest.Models.Data;

namespace CodingTest.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers(UserFilter filter);
        User GetUser(int id);
        User GetUserByEmail(string email);
        void AddUser(User user);
        void UpdateUser(User oldUser, User updatedUser);
        void DeleteUser(User user);
        int GetTotalUserCount(string searchText);
    }
}
