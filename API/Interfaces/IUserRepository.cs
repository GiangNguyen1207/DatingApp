using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<AppUser> GetUserByIdAsync(int id);
    
    Task<IEnumerable<MemberDto>> GetMembersAsync();

    Task<MemberDto> GetMemberAsync(string username);

    Task<bool> SaveAllAsync();
    
    void Update(AppUser appUser);
}