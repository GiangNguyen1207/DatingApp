using System.Security.Claims;

namespace API.Extensions;

public static class ClaimPrincipleExtensions
{
     public static string GetUsername(this ClaimsPrincipal user)
     {
          return user.FindFirst(ClaimTypes.Name)?.Value;
     } 
     
     public static int GetUserId(this ClaimsPrincipal user)
     {
          var value = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
          if (value != null) return int.Parse(value);
          return -1;
     } 
}