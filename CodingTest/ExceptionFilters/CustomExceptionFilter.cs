using CodingTest.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace CodingTest.ExceptionFilters
{
    public class CustomExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<CustomExceptionFilter> _logger;

        public CustomExceptionFilter(ILogger<CustomExceptionFilter> logger)
        {
            _logger = logger;
        }
        public override void OnException(ExceptionContext context)
        {
            var exceptionType = context.Exception.GetType();
            var result = new ObjectResult(new
            {
                context.Exception.Message,
                context.Exception.Source,
                ExceptionType = context.Exception.GetType().FullName,
            })
            {
                StatusCode = GetStatusCode(exceptionType)
            };

            _logger.LogError($"{context.Exception}");
            context.Result = result;
        }

        private static int GetStatusCode(Type exceptionType)
        {
            if (exceptionType == typeof(RecordNotFoundException))
                return (int)HttpStatusCode.NotFound;
            
            return (int)HttpStatusCode.InternalServerError;
        }
    }
}
