namespace API.Helpers;

public class PaginationHeader
{
    public int CurrentPageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }

    public PaginationHeader(int currentPageNumber, int pageSize, int totalPages, int totalCount)
    {
        CurrentPageNumber = currentPageNumber;
        PageSize = pageSize;
        TotalPages = totalPages;
        TotalCount = totalCount;
    }
}