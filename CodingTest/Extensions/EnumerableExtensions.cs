namespace CodingTest.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> OrderByCustomParams<T>(
            this IEnumerable<T> records, string orderBy = null, string direction = null)
        {
            var items = new List<T>();

            if (string.IsNullOrWhiteSpace(orderBy) || string.IsNullOrWhiteSpace(direction))
                return records;

            if (direction == "ASC")
            {
                return records.OrderBy(r => r.GetType().GetProperty(orderBy).GetValue(r)).ToList();
            }
            else
            {
                return records.OrderByDescending(r => r.GetType().GetProperty(orderBy).GetValue(r)).ToList();
            }
        }
    }
}
