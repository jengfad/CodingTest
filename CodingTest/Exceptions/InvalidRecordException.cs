using Newtonsoft.Json;

namespace CodingTest.Exceptions
{
    public class InvalidRecordException<T> : Exception
    {
        public InvalidRecordException() { }

        public InvalidRecordException(string missingProperty, T obj)
            : base($"Missing value for {missingProperty} : {JsonConvert.SerializeObject(obj)}")
        {
        }
    }
}
