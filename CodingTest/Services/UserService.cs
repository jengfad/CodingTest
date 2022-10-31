using AutoMapper;
using CodingTest.Models.Data;
using CodingTest.Models.Dto;
using CodingTest.Repositories;

namespace CodingTest.Services
{
    public class UserService: IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public UserService(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public UserDto GetUser(int id)
        {
            var user = _userRepository.GetUser(id);
            return _mapper.Map<User, UserDto>(user);
        }

        public IEnumerable<UserDto> GetUsers()
        {
            var users = _userRepository.GetUsers();
            return _mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users);
        }

        public IEnumerable<UserDto> GetUsers(int pageNumber, int pageSize, string searchText)
        {
            var users = _userRepository.GetUsers(pageNumber, pageSize, searchText);
            return _mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users);
        }

        public void AddUser(UserDto dto)
        {
            var userToAdd = _mapper.Map<UserDto, User>(dto);
            _userRepository.AddUser(userToAdd);
        }

        public void UpdateUser(UserDto dto)
        {
            var userToUpdate = _mapper.Map<UserDto, User>(dto);
            _userRepository.UpdateUser(userToUpdate);
        }

        public void DeleteUser(int id)
        {
            _userRepository.DeleteUser(id);
        }
    }
}
