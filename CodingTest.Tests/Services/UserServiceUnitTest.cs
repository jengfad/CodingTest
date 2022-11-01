using CodingTest.DataContext;
using CodingTest.Repositories;
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

        public UserServiceUnitTest()
        {
            _dataContext = new MockDataContext();
            _userRepository = new UserRepository(_dataContext);
        }


        //[Fact]
        //public async Task Should_Return_User_Total_Count()
        //{
        //    var count = _userRepository.GetTotalUserCount()
        //    Assert.NotNull(reference);
        //}
    }
}
