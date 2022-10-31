namespace CodingTest.Models.Dto
{
    public class PagedUsersDto
    {
        public IEnumerable<UserDto> Users { get; set; }
        public int TotalItems { get; set; }
    }
}
