using CodingTest.DataContext;
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

        public IEnumerable<User> GetUsers()
        {
            return _dataContext.Users.OrderBy(u => u.Email);
        }

        public IEnumerable<User> GetUsers(int pageNumber, int pageSize, string searchText)
        {
            var skipRecords = (pageNumber - 1) * pageSize;
            return _dataContext.Users
                .Where(user => user.IsUserMatch(searchText))
                .Skip(skipRecords)
                .Take(pageSize);
        }

        public void AddUser(User user)
        {
            user.Id = GetNewUserId();
            _dataContext.Users.Add(user);
        }

        private int GetNewUserId()
        {
            return _dataContext.Users.Count + 1;
        }

        public int GetTotalUserCount(string searchText)
        {
            return _dataContext.Users.Where(user => user.IsUserMatch(searchText)).Count();
        }

        public void UpdateUser(User user)
        {
            var toUpdate = _dataContext.Users.First(u => u.Id == user.Id);
            toUpdate.Email = user.Email;
            toUpdate.FirstName = user.FirstName;
            toUpdate.LastName = user.LastName;
            toUpdate.Gender = user.Gender;
            toUpdate.Status = user.Status;
        }

        public void DeleteUser(int id)
        {
            var user = _dataContext.Users.First(u => u.Id == id);
            _dataContext.Users.Remove(user);
        }
    }
}
