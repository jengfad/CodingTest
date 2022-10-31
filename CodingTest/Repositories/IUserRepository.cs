using CodingTest.Models.Data;

namespace CodingTest.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        IEnumerable<User> GetUsers(int pageNumber, int pageSize, string searchText);
        User GetUser(int id);
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
    }
}
