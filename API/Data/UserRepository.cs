using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<PagedList<MemberDto>> GetMembersAsync(PageParams pageParams)
    {
        var query = _context.Users.AsQueryable();
        query = query.Where(user => user.UserName != pageParams.CurrentUserName);
        query = query.Where(user => user.Gender == pageParams.Gender);

        var minDateOfBirth = DateTime.Today.AddYears(-pageParams.MaxAge - 1);
        var maxDateOfBirth = DateTime.Today.AddYears(-pageParams.MinAge);

        query = query.Where(user => user.DateOfBirth >= minDateOfBirth && user.DateOfBirth <= maxDateOfBirth);
        query = pageParams.OrderBy switch
        {
            "created" => query.OrderByDescending(user => user.Created),
            _ => query.OrderByDescending(user => user.LastActive)
        };

        var memberQuery = query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking();

        return await PagedList<MemberDto>.CreatePagedListAsync(memberQuery, pageParams.CurrentPageNumber,
            pageParams.PageSize);
    }

    public async Task<MemberDto> GetMemberAsync(string username)
    {
        return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(user => user.Username == username);
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
        return await _context.Users
            .Include(user => user.Photos)
            .FirstOrDefaultAsync(user => user.UserName == username);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser appUser)
    {
        _context.Entry(appUser).State = EntityState.Modified;
    }
}