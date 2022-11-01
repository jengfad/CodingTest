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

        public UserRepositoryUnitTest()
        {
            _dataContext = new MockDataContext();
            _userRepository = new UserRepository(_dataContext);
        }

        private User GetTestUser1()
        {
            return new User
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "johndoe@mailinator.com",
                Status = true,
                Gender = GenderEnum.Male.Description()
            };
        }

        [Fact]
        public void It_Should_Add_User()
        {
            var newUser = GetTestUser1();

            var newUserId = _userRepository.AddUser(newUser);

            var currentIdentity = _dataContext.GetUserIdentity();
            Assert.Equal(newUserId, currentIdentity);
        }

        [Fact]
        public void It_Should_Delete_User()
        {
            var newUser = GetTestUser1();

            var newUserId = _userRepository.AddUser(newUser);
            var totalBeforeDelete = _dataContext.GetTotal();
            var userToDelete = _userRepository.GetUser(newUserId);

            _userRepository.DeleteUser(userToDelete);
            var deletedUser = _userRepository.GetUser(newUserId);
            var totalAfterDelete = _dataContext.GetTotal();

            Assert.Null(deletedUser);
            Assert.Equal(totalBeforeDelete - 1, totalAfterDelete);
        }

        [Fact]
        public void It_Should_Not_Delete_Non_Existing_User()
        {
            var nonExistingUser = new User
            {
                Id = 2000,
                FirstName = "Selina",
                LastName = "Kyle",
                Email = "selinakyle@mailinator.com",
                Status = true,
                Gender = GenderEnum.Female.Description()
            };

            var totalBeforeDelete = _dataContext.GetTotal();
            _userRepository.DeleteUser(nonExistingUser);

            var totalAfterDelete = _dataContext.GetTotal();
            Assert.Equal(totalAfterDelete, totalBeforeDelete);
        }

        [Fact]
        public void It_Should_Update_User()
        {
            var newUser = GetTestUser1();

            var newUserId = _userRepository.AddUser(newUser);
            var oldUser = _userRepository.GetUser(newUserId);
            var updatedUser = _userRepository.GetUser(newUserId);

            updatedUser.FirstName = "Jane";
            updatedUser.Gender = GenderEnum.Female.Description();

            _userRepository.UpdateUser(oldUser, updatedUser);
            var userFromDb = _userRepository.GetUser(newUserId);
            Assert.Equal("Jane", userFromDb.FirstName);
            Assert.Equal(GenderEnum.Female.Description(), userFromDb.Gender);
        }

        [Fact]
        public void It_Should_Get_Existing_User_By_Id()
        {
            var newUser = GetTestUser1();
            var newUserId = _userRepository.AddUser(newUser);

            var userFromDb = _userRepository.GetUser(newUserId);

            Assert.Equal(newUserId, userFromDb.Id);
            Assert.Equal(newUser.Email, userFromDb.Email);
        }

        [Fact]
        public void It_Should_Not_Get_Non_Existing_User_By_Id()
        {
            var nonExistingId = 9999;

            var userFromDb = _userRepository.GetUser(nonExistingId);

            Assert.Null(userFromDb);
        }

        [Fact]
        public void It_Should_Get_Existing_User_By_Email()
        {
            var newUser = GetTestUser1();
            var newUserId = _userRepository.AddUser(newUser);

            var userFromDb = _userRepository.GetUserByEmail(newUser.Email);

            Assert.Equal(newUserId, userFromDb.Id);
            Assert.Equal(newUser.Email, userFromDb.Email);
        }

        [Fact]
        public void It_Should_Not_Get_Non_Existing_User_By_Email()
        {
            var nonExistingEmail = "theunburnt@mailinator.com";

            var userFromDb = _userRepository.GetUserByEmail(nonExistingEmail);

            Assert.Null(userFromDb);
        }

        [Fact]
        public void It_Should_Get_First_3_Users_Arranged_By_Email_Asc()
        {
            var addedUsers = new List<User>
            { 
                new User
                {
                    Email = "aaaaa1@mailinator.com"
                },
                new User
                {
                    Email = "aaaaa2@mailinator.com"
                },
                new User
                {
                    Email = "aaaaa3@mailinator.com"
                }
            };

            foreach(var user in addedUsers)
            {
                _userRepository.AddUser(user);
            }

            var filters = new UserFilter
            {
                PageNumber = 1,
                PageSize = 3,
                SearchText = "",
                SortBy = "Email",
                SortDirection = "ASC"
            };

            var usersFromDb = _userRepository.GetUsers(filters);

            Assert.Equal(3, usersFromDb.Count());
            foreach (var userFromDb in usersFromDb)
            {
                var userMatch = addedUsers.Where(u => u.Email == userFromDb.Email);
                Assert.NotNull(userMatch);
            }
        }


        [Fact]
        public void It_Should_Get_First_3_Users_Arranged_By_Last_Name_Desc()
        {
            var addedUsers = new List<User>
            {
                new User
                {
                    LastName = "zzzzz1"
                },
                new User
                {
                    LastName = "zzzzz2"
                },
                new User
                {
                    LastName = "zzzzz3"
                }
            };

            foreach (var user in addedUsers)
            {
                _userRepository.AddUser(user);
            }

            var filters = new UserFilter
            {
                PageNumber = 1,
                PageSize = 3,
                SearchText = "",
                SortBy = "LastName",
                SortDirection = "DESC"
            };

            var usersFromDb = _userRepository.GetUsers(filters);

            Assert.Equal(3, usersFromDb.Count());
            foreach (var userFromDb in usersFromDb)
            {
                var userMatch = addedUsers.Where(u => u.LastName == userFromDb.LastName);
                Assert.NotNull(userMatch);
            }
        }

        [Fact]
        public void It_Should_Get_First_3_Users_Having_First_Name_Search_Text()
        {
            var searchText = "Rhaenyra Alicent Daenerys";
            var addedUsers = new List<User>
            {
                new User
                {
                    FirstName = $"{searchText} 1",
                    LastName = $"{searchText} 1",
                    Email = $"{searchText} 1",
                },
                new User
                {
                    FirstName = $"{searchText} 2",
                    LastName = $"{searchText} 2",
                    Email = $"{searchText} 2",
                },
                new User
                {
                    FirstName = $"{searchText} 3",
                    LastName = $"{searchText} 3",
                    Email = $"{searchText} 3",
                }
            };

            foreach (var user in addedUsers)
            {
                _userRepository.AddUser(user);
            }

            var filters = new UserFilter
            {
                PageNumber = 1,
                PageSize = 3,
                SearchText = searchText,
                SortBy = "FirstName",
                SortDirection = "ASC"
            };

            var usersFromDb = _userRepository.GetUsers(filters);

            Assert.Equal(3, usersFromDb.Count());
            foreach (var userFromDb in usersFromDb)
            {
                var userMatch = addedUsers.Where(u => u.FirstName == userFromDb.FirstName);
                Assert.NotNull(userMatch);
            }
        }
    }
}
