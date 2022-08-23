using System.Text.Json;
using API.Helpers;

namespace API.Extensions;

public static class HttpExtension
{
    public static void AddPaginationHeader(this HttpResponse response, int currentPage, int pageSize, int totalPages,
        int totalCount)
    {
        var paginationHeader = new PaginationHeader(currentPage, pageSize, totalPages, totalCount);

        var option = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
            
        response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, option));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}