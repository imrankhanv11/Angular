using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.ServiceLayer.DTO1.Auth.Request;
using EmployeeInterview.ServiceLayer.DTO1.Auth.Response;
using EmployeeInterview.ServiceLayer.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.Service
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepo _repo;
        private readonly IConfiguration _config;

        public AuthService(IAuthRepo repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }


        public async Task<string> GenereteJWTTokenService(int id, string RoleName, bool IsAccessToken)
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTConnection:Key"]));
            var creads = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var Claim = new[]
            {

                new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                new Claim(ClaimTypes.Role, RoleName),
                new Claim("role", RoleName)

            };

            var AccessToken = int.Parse(_config["JWTConnection:AccessTokenExpire"]);
            var RefreshToken = int.Parse(_config["JWTConnection:RefreshToken"]);

            var token = new JwtSecurityToken(
                issuer: _config["JWTConnection:Issuer"],
                audience: _config["JWTConnection:Audience"],
                claims: Claim,
                signingCredentials: creads,
                expires: IsAccessToken ? DateTime.UtcNow.AddMinutes(AccessToken) : DateTime.UtcNow.AddDays(RefreshToken)
                );

            var JWTToken = new JwtSecurityTokenHandler().WriteToken(token);

            return JWTToken;
        }

        public async Task<LoginResponseDTO> LoginUserService(LoginRequestDTO dto)
        {
            var response = await _repo.EmployeeExits(dto.Email, dto.Password);

            if (response == null)
            {
                throw new ValidationException("Email and Password Wrong");
            }


            var AccesToken = await GenereteJWTTokenService(response.Id, response.Role.RoleName, true);

            var RefreshToken = await GenereteJWTTokenService(response.Id, response.Role.RoleName, false);

            var output = new LoginResponseDTO
            {
                AccessToken = AccesToken,
                RefreshToken = RefreshToken,
            };

            return output;
        }

        public async Task<LoginResponseDTO> RefreshTokenService(string refreshToken)
        {
            try
            {
                var key = Encoding.UTF8.GetBytes(_config["JWTConnection:Key"]);

                var CheckToken = new JwtSecurityTokenHandler().ValidateToken(refreshToken, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = _config["JWTConnection:Audience"],
                    ValidIssuer = _config["JWTConnection:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken newToken);


                var role = CheckToken.Claims.First(x => x.Type == ClaimTypes.Role).Value;
                var userID = CheckToken.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;

                var id = int.Parse(userID);

                var Accesstoken = await GenereteJWTTokenService(id, role, true);

                var Refreshtoken = await GenereteJWTTokenService(id, role, false);

                return new LoginResponseDTO
                {
                    AccessToken = Accesstoken,
                    RefreshToken = Refreshtoken
                };
            }
            catch
            {
                throw new UnauthorizedAccessException("Refresh Token was expired. Please Login");
            }
        }
    }
}
