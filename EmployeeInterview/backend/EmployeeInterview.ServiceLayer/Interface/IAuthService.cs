using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.ServiceLayer.DTO1.Auth.Request;
using EmployeeInterview.ServiceLayer.DTO1.Auth.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.Interface
{
    public interface IAuthService
    {
        Task<LoginResponseDTO> LoginUserService(LoginRequestDTO dto);

        Task<string> GenereteJWTTokenService(int id, string RoleName, bool IsAccessToken);

        Task<LoginResponseDTO> RefreshTokenService(string refreshToken);
    }
}
