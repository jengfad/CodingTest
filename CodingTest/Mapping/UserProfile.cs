using AutoMapper;
using CodingTest.Models.Data;
using CodingTest.Models.Dto;

namespace CodingTest.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Id, u => u.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, u => u.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, u => u.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, u => u.MapFrom(src => src.Email))
                .ForMember(dest => dest.Status, u => u.MapFrom(src => src.Status))
                .ForMember(dest => dest.Gender, u => u.MapFrom(src => src.Gender));

            CreateMap<UserDto, User>()
                .ForMember(dest => dest.Id, u => u.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, u => u.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, u => u.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, u => u.MapFrom(src => src.Email))
                .ForMember(dest => dest.Status, u => u.MapFrom(src => src.Status))
                .ForMember(dest => dest.Gender, u => u.MapFrom(src => src.Gender));
        }
    }
}
