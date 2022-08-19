using System.Security.Claims;

namespace API.Extensions;

public static class ClaimPrinicpleExtensions
{
     public static string GetUsername(this ClaimsPrincipal user)
     {
          return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
     } 
}