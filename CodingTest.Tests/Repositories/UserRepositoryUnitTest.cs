using CodingTest.DataContext;
using CodingTest.Enums;
using CodingTest.Extensions;
using CodingTest.Models.Data;
using CodingTest.Repositories;

namespace CodingTest.Tests.Repositories
{
    public class UserRepositoryUnitTest
    {
        private IDataContext _dataContext;
        private IUserRepository _userRepository;

        private User _testUser;

        public UserRepositoryUnitTest()
        {
            _dataContext = new MockDataContext();
            _userRepository = new UserRepository(_dataContext);
            _testUser = new User
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "johndoe@mailinator.com",
                Status = true,
                Gender = GenderEnum.Male.Description()
            };
        }

        [Fact]
        public void Should_Add_User()
        {
            var newUserId = _userRepository.AddUser(_testUser);

            var currentIdentity = _dataContext.GetUserIdentity();
            Assert.Equal(newUserId, currentIdentity);
        }

        [Fact]
        public void Should_Delete_User()
        {
            var newUserId = _userRepository.AddUser(_testUser);
            var totalBeforeDelete = _dataContext.GetTotal();
            var userToDelete = _userRepository.GetUser(newUserId);

            _userRepository.DeleteUser(userToDelete);
            var deletedUser = _userRepository.GetUser(newUserId);
            var totalAfterDelete = _dataContext.GetTotal();

            Assert.Null(deletedUser);
            Assert.Equal(totalBeforeDelete - 1, totalAfterDelete);
        }

        [Fact]
        public void Should_Update_User()
        {
            var newUserId = _userRepository.AddUser(_testUser);
            var oldUser = _userRepository.GetUser(newUserId);
            var updatedUser = _userRepository.GetUser(newUserId);

            updatedUser.FirstName = "Jane";
            updatedUser.Gender = GenderEnum.Female.Description();

            _userRepository.UpdateUser(oldUser, updatedUser);
            var theUser = _userRepository.GetUser(newUserId);
            Assert.Equal("Jane", theUser.FirstName);
            Assert.Equal(GenderEnum.Female.Description(), theUser.Gender);
        }
    }
}
