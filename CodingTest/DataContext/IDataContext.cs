using CodingTest.Models.Data;

namespace CodingTest.DataContext
{
    public interface IDataContext
    {
        IList<User> Users { get; set; }
    }
}
