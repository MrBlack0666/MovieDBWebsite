using BAS.AppCommon;
using BAS.AppServices;
using BAS.Database;
using BAS.Identity;
using BAS.Projekt.Services;
using BAS.Services;
using BAS.Services.Notification;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace BAS.Projekt
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appConfig = new AppConfig();
            ConfigurationBinder.Bind(this.Configuration, appConfig);

            services.AddControllers();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/ClientApp";
            });

            #region MovieDatabase
            services.AddDbContext<MovieDbContext>(options =>
            {
                options.UseSqlServer(appConfig.ConnectionStrings.MovieDatabase);
            });
            #endregion

            #region IdentityConfig
            services.AddDbContext<IdentityContext>(options =>
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
            #endregion

            #region Repository
            //services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            //services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            #region Services
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IGenreService, GenreService>();
            services.AddScoped<IPersonnelService, PersonnelService>();
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IReviewService, ReviewService>();
            services.AddScoped<IUserContext, UserContext>();
            services.AddScoped<IUrlHelper, Services.UrlHelper>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddScoped(x => {
                var actionContext = x.GetRequiredService<IActionContextAccessor>().ActionContext;
                var factory = x.GetRequiredService<IUrlHelperFactory>();
                return factory.GetUrlHelper(actionContext);
            });
            services.AddSingleton<IAppContext, WebAppContext>();
            this.ConfigureNotifications(services);
            this.AddAppConfigAccessor(services);
            #endregion

            this.ConfigureJWTToken(services);
        }

        private void AddAppConfigAccessor(IServiceCollection services)
        {
            services.AddOptions();
            services.AddSingleton(x =>
            {
                var config = x.GetRequiredService<IConfiguration>();
                var appConfig = new AppConfig();
                config.Bind(appConfig);
                return appConfig;
            });
        }

        private void ConfigureNotifications(IServiceCollection services)
        {
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<INotificationAggregateServices, NotificationAggregateServices>();

            var notifications = typeof(NotificationService).Assembly.DefinedTypes.Where(x => x.GetInterfaces().Contains(typeof(INotification)));
            foreach (var notification in notifications)
            {
                services.Add(new ServiceDescriptor(typeof(INotification), notification, ServiceLifetime.Scoped));
            }
        }

        private void ConfigureJWTToken(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration.GetSection(nameof(AppConfig.Host)).GetValue<string>(nameof(AppConfig.Host.Url)),
                    ValidIssuer = Configuration.GetSection(nameof(AppConfig.Host)).GetValue<string>(nameof(AppConfig.Host.Url)),
                    RoleClaimType = StaticValues.JWTRoleClaim,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection(nameof(AppConfig.JWTToken))
                        .GetValue<string>(nameof(AppConfig.JWTToken.SigningKey)))),
                    ClockSkew = TimeSpan.FromDays(1),
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var appConfig = app.ApplicationServices.GetRequiredService<AppConfig>();

            if (env.IsDevelopment())
            {
                app.UseCors(options => options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
            }
            else
            {
                app.UseCors(options => options.WithOrigins(appConfig.Host.Url).AllowAnyHeader().AllowAnyOrigin());
            }

            app.UseDeveloperExceptionPage();
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            app.UseHttpsRedirection();

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
