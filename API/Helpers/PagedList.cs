using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public class PagedList<T> : List<T>
{
    public int CurrentPageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }

    public PagedList(IEnumerable<T> items, int count, int currentPage, int pageSize)
    {
        CurrentPageNumber = currentPage;
        PageSize = pageSize;
        TotalPages = (int) Math.Ceiling(count / (double) pageSize);
        TotalCount = count;
        AddRange(items);
    }

    public static async Task<PagedList<T>> CreatePagedListAsync(IQueryable<T> source, int currentPageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        var items = await source.Skip((currentPageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, currentPageNumber, pageSize);
    }
}