using BAS.AppCommon;
using BAS.AppServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace BAS.Tests.Integration
{
    public class AuthServiceTests : BaseIntegrationTest
    {
        public AuthServiceTests(IntegrationTestsFixture services)
            : base(services)
        {
        }

        #region Register
        [Fact]
        public async Task Register_EmptyRegisterDTO_ReturnsFalse()
        {
            //pawel.kowalski.12345@wp.pl
            try
            {
                var authService = this.serviceProvider.GetService<IAuthService>();

                var result = await authService.Register(new RegisterDTO() { });

                Assert.True(false);
            }
            catch (Exception e)
            {
                Assert.True(true);
            }
        }

        [Fact]
        public async Task Register_RegisterNewAccount_ReturnsTrue()
        {
            try
            {
                var authService = this.serviceProvider.GetService<IAuthService>();

                var result = await authService.Register(new RegisterDTO() { Email = "pawel.kowalski.12345@wp.pl", Name = "New", Surname = "User", Username = "NewUser", Password = "user123", ConfirmedPassword = "user123" });

                Assert.True(result.Success && result.EmailTaken && result.UsernameTaken);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion



        #region Seeders
        #endregion
    }
}