using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<AppUser> GetUserByIdAsync(int id);
    
    Task<PagedList<MemberDto>> GetMembersAsync(PageParams pageParams);

    Task<MemberDto> GetMemberAsync(string username);
    
    Task<AppUser> GetUserByUsernameAsync(string username);

    Task<bool> SaveAllAsync();
    
    void Update(AppUser appUser);
}