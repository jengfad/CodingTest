
namespace CodingTest.Models.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public bool Status { get; set; }

        public bool IsUserMatch(string searchText)
        {
            if (string.IsNullOrWhiteSpace(searchText)) return true;

            var searchTextLower = searchText.ToLower();
            return Email.ToLower().Contains(searchTextLower)
                    || FirstName.ToLower().Contains(searchTextLower)
                    || LastName.ToLower().Contains(searchTextLower);
        }
    }
}
