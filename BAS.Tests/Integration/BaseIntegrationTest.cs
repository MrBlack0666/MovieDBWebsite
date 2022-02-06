using BAS.Identity;
using BAS.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.EntityFrameworkCore;
using BAS.AppServices;
using Xunit;
using BAS.Tests.Services;
using System.IO;
using System.Linq;
using BAS.AppCommon;

namespace BAS.Tests.Integration
{
    public class IntegrationTestsFixture
    {
        private IServiceProvider serviceProvider;
        private AppConfig appConfig;

        public IServiceProvider ServiceProvider => this.serviceProvider;
        public AppConfig AppConfig => this.appConfig;

        public IntegrationTestsFixture()
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile(StaticValues.SettingsFileName)
                .Build();
            var testsConfig = new AppConfig();
            ConfigurationBinder.Bind(configuration, testsConfig);

            this.appConfig = testsConfig;
            this.serviceProvider = this.Setup();
        }

        private IServiceProvider Setup()
        {
            var services = new ServiceCollection();

            this.ConfigureDatabase(services);
            this.RegisterServices(services);

            var serviceProvider = services.BuildServiceProvider();
            this.CreateIdentityDatabase(serviceProvider);
            this.CreateMovieDatabase(serviceProvider);
            this.ClearContent(serviceProvider);

            return serviceProvider;
        }

        private void ClearContent(IServiceProvider serviceProvider)
        {
            var appContext = serviceProvider.GetRequiredService<IAppContext>();

            if (!Directory.Exists(appContext.ServableContentPath))
            {
                Directory.CreateDirectory(appContext.ServableContentPath);
            }

            var directoryInfo = new DirectoryInfo(appContext.ServableContentPath);
           
            foreach (var file in directoryInfo.GetFiles())
            {
                file.Delete();
            }
            foreach (var dir in directoryInfo.GetDirectories())
            {
                dir.Delete(true);
            }
        }

        private void ConfigureDatabase(IServiceCollection services)
        {
            services.AddDbContext<IdentityContext>(options =>
            {
                options.UseSqlServer(appConfig.ConnectionStrings.MovieDatabase);
            });
            services.AddDbContext<MovieDbContext>(options =>
            {
                options.UseSqlServer(appConfig.ConnectionStrings.Identity);
            });
            services.AddIdentity<ApplicationUser, IdentityRole<long>>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 5;
            })
            .AddEntityFrameworkStores<IdentityContext>()
            .AddDefaultTokenProviders();
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddLogging();
            services.AddOptions();
            services.AddSingleton(x => this.appConfig);
            services.AddSingleton<IAppContext>(x => new TestsAppContext());
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IGenreService, GenreService>();
            services.AddScoped<IPersonnelService, PersonnelService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<INotificationService, NotificationService>();
            //services.AddScoped<IUserContext, UserContext>();
            //services.AddScoped<IUrlHelper, Projekt.Services.UrlHelper>();
            //services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            //services.AddScoped<INotificationAggregateServices, NotificationAggregateServices>();
            //services.AddScoped(x => {
            //    var actionContext = x.GetRequiredService<IActionContextAccessor>().ActionContext;
            //    var factory = x.GetRequiredService<IUrlHelperFactory>();
            //    return factory.GetUrlHelper(actionContext);
            //});
            //services.AddSingleton<IAppContext, WebAppContext>();

            //var notifications = typeof(NotificationService).Assembly.DefinedTypes.Where(x => x.GetInterfaces().Contains(typeof(INotification)));
            //foreach (var notification in notifications)
            //{
            //    services.Add(new ServiceDescriptor(typeof(INotification), notification, ServiceLifetime.Scoped));
            //}
        }

        private void CreateIdentityDatabase(IServiceProvider serviceProvider)
        {
            var identityContext = serviceProvider.GetService<IdentityContext>();
            identityContext.Database.Migrate();
        }

        private void CreateMovieDatabase(IServiceProvider serviceProvider)
        {
            var movieContext = serviceProvider.GetService<MovieDbContext>();
            movieContext.Database.Migrate();
        }
    }

    public class BaseIntegrationTest : IClassFixture<IntegrationTestsFixture>
    {
        protected readonly IServiceProvider serviceProvider;
        protected static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();

        public BaseIntegrationTest(IntegrationTestsFixture services)
        {
            this.serviceProvider = services.ServiceProvider;
            this.ClearIdentityDatabase(serviceProvider);
            this.ClearMovieDatabase(serviceProvider);
            this.SeedIdentityDatabase(serviceProvider);
        }

        private void SeedIdentityDatabase(IServiceProvider serviceProvider)
        {
            var identityContext = serviceProvider.GetService<IdentityContext>();

            if (!identityContext.Roles.Any())
            {
                identityContext.Roles.Add(new IdentityRole<long>(UserRole.Admin.ToString()));
                identityContext.Roles.Add(new IdentityRole<long>(UserRole.User.ToString()));
                identityContext.SaveChanges();

                var roles = identityContext.Roles.ToList();

                foreach (var role in roles)
                {
                    role.NormalizedName = role.Name.ToUpper();
                }
                identityContext.SaveChanges();

                //await roleManager.(new IdentityRole<long>(UserRole.Admin.ToString()));
                //await roleManager.CreateAsync(new IdentityRole<long>(UserRole.User.ToString()));
            }
        }

        private void ClearIdentityDatabase(IServiceProvider serviceProvider)
        {
            var identityContext = serviceProvider.GetService<IdentityContext>();
            identityContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[AspNetUserClaims]");
            identityContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[AspNetUserLogins]");
            identityContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[AspNetUserRoles]");
            identityContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[AspNetUserTokens]");
            identityContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[AspNetUsers]");
            identityContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[AspNetRoleClaims]");
            identityContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[AspNetRoles]");
        }
 
        private void ClearMovieDatabase(IServiceProvider serviceProvider)
        {
            var movieContext = serviceProvider.GetService<MovieDbContext>();
            movieContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[MovieGenres]");
            movieContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[Genres]");
            movieContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[MoviePersonnel]");
            movieContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[Actors]");
            movieContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[Reviews]");
            movieContext.Database.ExecuteSqlRaw($"DELETE FROM [dbo].[Movies]");
        }
    }
}
