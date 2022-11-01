using AutoMapper;
using CodingTest.DataContext;
using CodingTest.Enums;
using CodingTest.Exceptions;
using CodingTest.Extensions;
using CodingTest.Mapping;
using CodingTest.Models.Data;
using CodingTest.Models.Dto;
using CodingTest.Repositories;
using CodingTest.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodingTest.Tests.Services
{
    public class UserServiceUnitTest
    {
        private IDataContext _dataContext;
        private IUserRepository _userRepository;
        private IUserService _userService;

        public UserServiceUnitTest()
        {
            _dataContext = new MockDataContext();
            _userRepository = new UserRepository(_dataContext);

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new UserProfile());
            });
            var mapper = mockMapper.CreateMapper();
            _userService = new UserService(mapper, _userRepository);
        }

        private UserDto GetTestUser1()
        {
            return new UserDto
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
            var newUserId = _userService.AddUser(newUser);

            var actualUser = _userService.GetUser(newUserId);
            Assert.Equal(newUserId, actualUser.Id);
        }

        [Fact]
        public void It_Should_Throw_Add_User_Error_On_Missing_Email()
        {
            var newUser = GetTestUser1();
            newUser.Email = null;

            var ex = Assert.Throws<InvalidRecordException<UserDto>>(() => _userService.AddUser(newUser));
            var type = ex.GetType();
            Assert.Contains("InvalidRecordException", type.ToString());
        }

        [Fact]
        public void It_Should_Throw_Add_User_Error_On_Missing_First_Name()
        {
            var newUser = GetTestUser1();
            newUser.FirstName = string.Empty;

            var ex = Assert.Throws<InvalidRecordException<UserDto>>(() => _userService.AddUser(newUser));
            var type = ex.GetType();
            Assert.Contains("InvalidRecordException", type.ToString());
        }

        [Fact]
        public void It_Should_Update_User()
        {
            var newUser = GetTestUser1();
            var newUserId = _userService.AddUser(newUser);

            newUser.FirstName = "John Wayne";
            newUser.Status = false;
            newUser.Id = newUserId;

            _userService.UpdateUser(newUser);

            var actualUser = _userService.GetUser(newUserId);

            Assert.Equal("John Wayne", actualUser.FirstName);
            Assert.Equal(false, actualUser.Status);
        }

        [Fact]
        public void It_Should_Throw_Update_User_Error_On_Non_Existing_User()
        {
            var nonExistingUser = GetTestUser1();
            nonExistingUser.Id = 2000;

            var ex = Assert.Throws<RecordNotFoundException>(() => _userService.UpdateUser(nonExistingUser));
            var type = ex.GetType();
            Assert.Contains("RecordNotFoundException", type.ToString());
        }

        [Fact]
        public void It_Should_Throw_Update_User_Error_On_Missing_Last_Name()
        {
            var newUser = GetTestUser1();
            newUser.LastName = string.Empty;

            var ex = Assert.Throws<InvalidRecordException<UserDto>>(() => _userService.UpdateUser(newUser));
            var type = ex.GetType();
            Assert.Contains("InvalidRecordException", type.ToString());
        }

        [Fact]
        public void It_Should_Throw_Update_User_Error_On_Missing_First_Name()
        {
            var newUser = GetTestUser1();
            newUser.FirstName = string.Empty;

            var ex = Assert.Throws<InvalidRecordException<UserDto>>(() => _userService.UpdateUser(newUser));
            var type = ex.GetType();
            Assert.Contains("InvalidRecordException", type.ToString());
        }

        [Fact]
        public void It_Should_Delete_User()
        {
            var newUser = GetTestUser1();
            var newUserId = _userService.AddUser(newUser);

            _userService.DeleteUser(newUserId);

            var actualUser = _userService.GetUserByEmail(newUser.Email);
            Assert.Null(actualUser);
        }

        [Fact]
        public void It_Should_Throw_Delete_User_Error_On_Non_Existing_User()
        {
            var nonExistingUserId = 3000;
            
            var ex = Assert.Throws<RecordNotFoundException>(() => _userService.DeleteUser(nonExistingUserId));
            var type = ex.GetType();
            Assert.Contains("RecordNotFoundException", type.ToString());
        }

        [Fact]
        public void It_Should_Get_User_By_Email()
        {
            var newUser = GetTestUser1();
            var newUserId = _userService.AddUser(newUser);

            var actualUser = _userService.GetUserByEmail(newUser.Email);
            Assert.Equal(newUser.Email, actualUser.Email);
        }

        [Fact]
        public void It_Should_Get_User_By_Uppercase_Email()
        {
            var newUser = GetTestUser1();
            var newUserId = _userService.AddUser(newUser);

            var actualUser = _userService.GetUserByEmail(newUser.Email.ToUpper());
            Assert.Equal(newUser.Email, actualUser.Email);
        }

        [Fact]
        public void It_Should_Get_User_By_Id()
        {
            var newUser = GetTestUser1();
            var newUserId = _userService.AddUser(newUser);

            var actualUser = _userService.GetUser(newUserId);
            Assert.Equal(newUserId, actualUser.Id);
        }

        [Fact]
        public void It_Should_Throw_Get_User_Error_On_Non_Existing_UserId()
        {
            var nonExistingUserId = 3000;

            var ex = Assert.Throws<RecordNotFoundException>(() => _userService.GetUser(nonExistingUserId));
            var type = ex.GetType();
            Assert.Contains("RecordNotFoundException", type.ToString());
        }

        [Fact]
        public void It_Should_Get_First_3_Users_Arranged_By_Email_Asc()
        {
            var addedUsers = new List<UserDto>
            {
                new UserDto
                {
                    Email = "aaaaa1@mailinator.com",
                    FirstName = "Test",
                    LastName = "Test",
                    Gender = GenderEnum.Male.Description(),
                    Status = true
                },
                new UserDto
                {
                    Email = "aaaaa2@mailinator.com",
                    FirstName = "Test",
                    LastName = "Test",
                    Gender = GenderEnum.Male.Description(),
                    Status = true
                },
                new UserDto
                {
                    Email = "aaaaa3@mailinator.com",
                    FirstName = "Test",
                    LastName = "Test",
                    Gender = GenderEnum.Male.Description(),
                    Status = true
                }
            };

            foreach (var user in addedUsers)
            {
                _userService.AddUser(user);
            }

            var filters = new UserFilter
            {
                PageNumber = 1,
                PageSize = 3,
                SearchText = "",
                SortBy = "Email",
                SortDirection = "ASC"
            };

            var usersFromDb = _userService.GetPagedUsers(filters);

            var expectedEmails = addedUsers.Select(user => user.Email);
            var actualEmails = usersFromDb.Users.Select(u => u.Email);

            Assert.True(expectedEmails.SequenceEqual(actualEmails));
        }

        [Fact]
        public void It_Should_Not_Return_Users_For_Non_Existing_Filters()
        {
            var filters = new UserFilter
            {
                PageNumber = 1,
                PageSize = 3,
                SearchText = "Daenerys Stormborn of House Targaryen, the First of Her Name",
                SortBy = "FirstName",
                SortDirection = "ASC"
            };

            var usersFromDb = _userService.GetPagedUsers(filters);

            Assert.Equal(0, usersFromDb.TotalItems);
        }
    }
}
