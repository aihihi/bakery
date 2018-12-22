using AutoMapper;
using BakeryAPI.Dtos;
//using BakeryAPI.Entities;
using BakeryAPI.Models;

namespace BakeryAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Users, UserDto>();
            CreateMap<UserDto, Users>();
        }
    }
}