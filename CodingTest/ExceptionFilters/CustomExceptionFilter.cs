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

            LogError(context, exceptionType);
            context.Result = result;
        }

        private void LogError(ExceptionContext context, Type exceptionType)
        {
            if (exceptionType == typeof(RecordNotFoundException))
                _logger.LogError(context.Exception.Message, context.Exception.Source);
            else
                _logger.LogError("Unhandled exception occurred while executing request: {ex}", context.Exception);
        }

        private static int GetStatusCode(Type exceptionType)
        {
            if (exceptionType == typeof(RecordNotFoundException))
                return (int)HttpStatusCode.NotFound;
            
            return (int)HttpStatusCode.InternalServerError;
        }
    }
}
