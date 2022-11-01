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
            var user = _dataContext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                throw new RecordNotFoundException(id);

            return user;
        }

        public User GetUserByEmail(string email)
        {
            var user = _dataContext.Users.FirstOrDefault(u => string.Equals(email, u.Email, StringComparison.OrdinalIgnoreCase));
            if (user == null)
                throw new RecordNotFoundException(email);

            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            return _dataContext.Users.OrderBy(u => u.Email);
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

        public void UpdateUser(User user)
        {
            var toUpdate = _dataContext.Users.FirstOrDefault(u => u.Id == user.Id);

            if (user == null) 
                throw new RecordNotFoundException(user.Email);

            toUpdate.Email = user.Email;
            toUpdate.FirstName = user.FirstName;
            toUpdate.LastName = user.LastName;
            toUpdate.Gender = user.Gender;
            toUpdate.Status = user.Status;
        }

        public void DeleteUser(int id)
        {
            var user = _dataContext.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                throw new RecordNotFoundException(id);

            _dataContext.Users.Remove(user);
        }
    }
}
