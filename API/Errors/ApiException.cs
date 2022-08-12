namespace API.Errors;

public class ApiException
{
    public ApiException(int statusCode, string message = null, string details = null)
    {
        StatusCode = statusCode;
        Message = message;
        Details = details;
    }

    private int StatusCode { get; set; }
    private string Message { get; set; }
    private string Details { get; set; }
}