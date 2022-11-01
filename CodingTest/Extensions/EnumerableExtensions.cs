namespace CodingTest.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> OrderByCustomParams<T>(
            this IEnumerable<T> records, string sortBy = null, string sortDirection = null)
        {
            var items = new List<T>();

            if (string.IsNullOrWhiteSpace(sortBy) || string.IsNullOrWhiteSpace(sortDirection))
                return records;

            if (sortDirection == "ASC")
            {
                return records.OrderBy(r => r.GetType().GetProperty(sortBy).GetValue(r)).ToList();
            }
            else
            {
                return records.OrderByDescending(r => r.GetType().GetProperty(sortBy).GetValue(r)).ToList();
            }
        }
    }
}
