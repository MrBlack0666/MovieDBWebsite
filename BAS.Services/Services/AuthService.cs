using BAS.AppCommon;
using BAS.Identity;
using BAS.Services.Notification;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Web;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly INotificationService notificationService;
        private readonly IdentityContext identityContext;
        private readonly AppConfig appConfig;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            INotificationService notificationService, IdentityContext identityContext,
            AppConfig appConfig)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.notificationService = notificationService;
            this.identityContext = identityContext;
            this.appConfig = appConfig;
        }

        public async Task<LogInResult> LogIn(LogInDTO loginDTO)
        {
            var result = new LogInResult();

            var user = await this.userManager.FindByEmailAsync(loginDTO.Email);

            result.HasConfirmedEmail = user?.EmailConfirmed ?? false;

            if (user != null && await this.userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                if (!result.HasConfirmedEmail)
                {
                    return result;
                }

                var signInResult = await this.signInManager.PasswordSignInAsync(user, loginDTO.Password, false, false);

                if (signInResult.Succeeded)
                {
                    var token = await this.GetAccessTokenAsync(user.Id);
                    result.Token = token;
                }

                result.Success = signInResult.Succeeded;
            }
            else
            {
                result.InvalidEmailOrPassword = true;
            }

            return result;
        }

        private async Task<string> GetAccessTokenAsync(long userId)
        {
            var user = await identityContext.Users.FindAsync(userId);

            var role = await identityContext.UserRoles.Where(p => p.UserId == userId)
                .Join(identityContext.Roles, p => p.RoleId, q => q.Id, (p, q) => q.Name)
                .SingleAsync();

            var utcNow = DateTime.UtcNow;
            
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(StaticValues.JWTFirstNameClaim, user.Name),
                new Claim(StaticValues.JWTLastNameClaim, user.Surname),
                new Claim(StaticValues.JWTUserAccountIdClaim, user.Id.ToString()),
                new Claim(StaticValues.JWTRoleClaim, role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, Math.Round((utcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0)).TotalSeconds, 0).ToString()),
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appConfig.JWTToken.SigningKey));

            var token = new JwtSecurityToken
            (
                issuer: appConfig.Host.Url,
                audience: appConfig.Host.Url,
                expires: utcNow.AddMinutes(appConfig.JWTToken.ExpirationTimeMinutes),
                claims: claims,
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<RegisterResultDTO> Register(RegisterDTO registerDTO)
        {
            var result = new RegisterResultDTO();

            var userWithSameUserName = await userManager.FindByNameAsync(registerDTO.Username);
            var userWithSameEmail = await userManager.FindByEmailAsync(registerDTO.Email);
            var wasPasswordsIdentical = registerDTO.Password.Equals(registerDTO.ConfirmedPassword);

            var isPaswordValid = true;
            var validators = this.userManager.PasswordValidators;

            foreach (var validator in validators)
            {
                var validateResult = await validator.ValidateAsync(this.userManager, null, registerDTO.Password);

                if (!validateResult.Succeeded)
                {
                    isPaswordValid = false;
                    break;
                }
            }

            result.UsernameTaken = userWithSameUserName != null;
            result.EmailTaken = userWithSameEmail != null;

            if (userWithSameUserName == null && userWithSameEmail == null && isPaswordValid && wasPasswordsIdentical)
            {
                var user = new ApplicationUser
                {
                    UserName = registerDTO.Username,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    Name = registerDTO.Name,
                    Surname = registerDTO.Surname,
                    Email = registerDTO.Email,
                };

                using (var transaction = this.identityContext.Database.BeginTransaction())
                {
                    var createResult = await userManager.CreateAsync(user, registerDTO.Password);

                    if (createResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, UserRole.User.ToString());
                        var token = HttpUtility.UrlEncode(await userManager.GenerateEmailConfirmationTokenAsync(user));

                        await notificationService.CreateNotification(NotificationType.REGISTRATION_CONFIRM, new RegistrationConfirmNotificationArgs
                        {
                            UserAccountId = user.Id,
                            Token = token,
                        });

                        result.Success = true;
                        transaction.Commit();
                    }
                }
            }

            return result;
        }

        public async Task<bool> ConfirmRegistration(ConfirmEmailDTO dto)
        {
            var user = await userManager.FindByIdAsync(dto.UserId);

            if (user.EmailConfirmed)
            {
                return false;
            }

            if (user == null)
            {
                return false;
            }

            var result = await userManager.ConfirmEmailAsync(user, dto.Token);
            return result.Succeeded;
        }

        public async Task LogOut()
        {
            await this.signInManager.SignOutAsync();
        }
    }
}
