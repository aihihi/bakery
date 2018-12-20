using AutoMapper;
using BakeryAPI.Dtos;
using BakeryAPI.Entities;

namespace BakeryAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}