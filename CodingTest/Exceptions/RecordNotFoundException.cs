namespace CodingTest.Exceptions
{
    public class RecordNotFoundException : Exception
    {
        public RecordNotFoundException() { }

        public RecordNotFoundException(int id)
            : base(String.Format($"Record not found for id: {id}"))
        {
        }

        public RecordNotFoundException(string prop)
            : base(String.Format($"Record not found for: {prop}"))
        {
        }
    }
}
