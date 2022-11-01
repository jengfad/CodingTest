using AutoMapper;
using CodingTest.Exceptions;
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

        public UserDto GetUserByEmail(string email)
        {
            var user = _userRepository.GetUserByEmail(email);
            return _mapper.Map<User, UserDto>(user);
        }

        public UserDto GetUser(int id)
        {
            var user = _userRepository.GetUser(id);
            
            if (user == null)
                throw new RecordNotFoundException(id);

            return _mapper.Map<User, UserDto>(user);
        }

        public PagedUsersDto GetPagedUsers(UserFilter filter)
        {
            var users = _userRepository.GetUsers(filter);
            var usersDto = _mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users);
            var count = _userRepository.GetTotalUserCount(filter.SearchText);
            return new PagedUsersDto { Users = usersDto, TotalItems = count };
        }

        public int AddUser(UserDto dto)
        {
            CheckRequiredFields(dto);
            var userToAdd = _mapper.Map<UserDto, User>(dto);
            return _userRepository.AddUser(userToAdd);
        }

        public void UpdateUser(UserDto dto)
        {
            CheckRequiredFields(dto);
            var oldUser = _userRepository.GetUser(dto.Id);

            if (oldUser == null)
                throw new RecordNotFoundException(dto.Email);

            var updatedUser = _mapper.Map<UserDto, User>(dto);
            _userRepository.UpdateUser(oldUser, updatedUser);
        }

        public void DeleteUser(int id)
        {
            var userToDelete = _userRepository.GetUser(id);

            if (userToDelete == null)
                throw new RecordNotFoundException(id);

            _userRepository.DeleteUser(userToDelete);
        }
        private void CheckRequiredFields(UserDto user)
        {
            var missingProps = new List<string>();
            if (string.IsNullOrWhiteSpace(user.Email))
                missingProps.Add("Email");
            if (string.IsNullOrWhiteSpace(user.FirstName))
                missingProps.Add("FirstName");
            if (string.IsNullOrWhiteSpace(user.LastName))
                missingProps.Add("LastName");
            if (string.IsNullOrWhiteSpace(user.Gender))
                missingProps.Add("Gender");

            if (missingProps.Any())
            {
                throw new InvalidRecordException<UserDto>(string.Join(",", missingProps), user);
            }
        }
    }
}
