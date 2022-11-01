﻿using CodingTest.Models.Data;

namespace CodingTest.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        IEnumerable<User> GetUsers(UserFilter filter);
        User GetUser(int id);
        User GetUserByEmail(string email);
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
        int GetTotalUserCount(string searchText);
    }
}
