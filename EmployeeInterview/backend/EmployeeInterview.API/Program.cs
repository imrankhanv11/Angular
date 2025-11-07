
using EmployeeInterview.API.GlobalException;
using EmployeeInterview.DataAccessLayer.Data;
using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.DataAccessLayer.Repository;
using EmployeeInterview.DataAccessLayer.Repository;
using EmployeeInterview.ServiceLayer.Interface;
using EmployeeInterview.ServiceLayer.Interface;
using EmployeeInterview.ServiceLayer.Service;
using EmployeeInterview.ServiceLayer.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EmployeeInterview.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4200") 
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });


            builder.Services.AddDbContext<EmployeeInterviewContext>(option =>
               option.UseSqlServer(builder.Configuration.GetConnectionString("MyDb")));

            builder.Services.AddControllers();
            builder.Services.AddScoped<IEmployeeServices, EmployeeServices>();
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            builder.Services.AddScoped<ICandidateRepository, CandidateRepository>();
            builder.Services.AddScoped<ICandidateServices, CandidateServices>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            
            // Swagger Authentication Configuration
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "EmployeeONboard",
                    Version = "v1"
                });

                // Add JWT Security Definition
                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header
                });

                // Apply JWT globally
                options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference
                            {
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // Auth
            builder.Services.AddScoped<IAuthRepo, AuthRepo>();
            builder.Services.AddScoped<IAuthService, AuthService>();

            // Interview
            builder.Services.AddScoped<IInterviewRepo, InterviewRepo>();
            builder.Services.AddScoped<IInterviewService,  InterviewService>();

            //JWT Token Configuration
            builder.Services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidateIssuer = true,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        ValidIssuer = builder.Configuration["JWTConnection:Issuer"],
                        ValidAudience = builder.Configuration["JWTConnection:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTConnection:Key"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            var app = builder.Build();

            app.UseMiddleware<ExceptionMiddleware>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Use CORS
            app.UseCors("AllowAngularApp");

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "root", "uploads");
            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(uploadsPath),
                RequestPath = "/uploads"
            });



            app.MapControllers();

            app.Run();
        }
    }
}
