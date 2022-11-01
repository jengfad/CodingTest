using CodingTest.Models.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CodingTest.DataContext
{
    public class MockDataContext : IDataContext
    {
        public IList<User> Users { get; set; }

        private int CurrentIdentity;

        public MockDataContext()
        {
            SeedUserData();
            CurrentIdentity = GetTotal();
        }

        public int GetUserIdentity()
        {
            return CurrentIdentity;
        }

        public void IncrementIdentity()
        {
            CurrentIdentity++;
        }

        public int GetTotal()
        {
            return Users.Count;
        }

        private void SeedUserData()
        {
            using (var r = new StreamReader("DataContext\\MOCK_DATA.json"))
            {
                string json = r.ReadToEnd();
                var options = new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy()
                    }
                };
                Users = JsonConvert.DeserializeObject<IList<User>>(json, options);
            }
        }
    }
}
