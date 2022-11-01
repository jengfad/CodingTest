using CodingTest.DataContext;
using CodingTest.Exceptions;
using CodingTest.Extensions;
using CodingTest.Models.Data;

namespace CodingTest.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDataContext _dataContext;

        public UserRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public User GetUser(int id)
        {
            return _dataContext.Users.FirstOrDefault(u => u.Id == id);
        }

        public User GetUserByEmail(string email)
        {
            return _dataContext.Users.FirstOrDefault(u => string.Equals(email, u.Email, StringComparison.OrdinalIgnoreCase));
        }

        public IEnumerable<User> GetUsers(UserFilter filter)
        {
            var skipRecords = (filter.PageNumber - 1) * filter.PageSize;
            return _dataContext.Users
                .Where(user => user.IsUserMatch(filter.SearchText))
                .OrderByCustomParams(filter.SortBy, filter.SortDirection)
                .Skip(skipRecords)
                .Take(filter.PageSize);
        }

        public void AddUser(User user)
        {
            user.Id = GetNewUserId();
            _dataContext.Users.Add(user);
        }

        private int GetNewUserId()
        {
            _dataContext.IncrementIdentity();
            return _dataContext.GetUserIdentity();
        }

        public int GetTotalUserCount(string searchText)
        {
            return _dataContext.Users.Where(user => user.IsUserMatch(searchText)).Count();
        }

        public void UpdateUser(User oldUser, User updatedUser)
        {
            oldUser.Email = updatedUser.Email;
            oldUser.FirstName = updatedUser.FirstName;
            oldUser.LastName = updatedUser.LastName;
            oldUser.Gender = updatedUser.Gender;
            oldUser.Status = updatedUser.Status;
        }

        public void DeleteUser(User user)
        {
            _dataContext.Users.Remove(user);
        }
    }
}
