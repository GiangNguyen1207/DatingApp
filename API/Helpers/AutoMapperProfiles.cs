using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(destination => destination.PhotoUrl,
                options => options.MapFrom
                    (source => source.Photos.FirstOrDefault(p => p.IsMain).Url)
            )
            .ForMember(destination => destination.Age,
                options => options.MapFrom
                    (source => source.DateOfBirth.CalculateAge())
            );
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>()
            .ForAllMembers(options => options.Condition(
                (source, destination, sourceMember) => (sourceMember != null))
            );
        CreateMap<RegisterDto, AppUser>();
    }
}