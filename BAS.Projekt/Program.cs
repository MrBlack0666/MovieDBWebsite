using BAS.Database;
using BAS.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BAS.Projekt
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var webHost = CreateHostBuilder(args).Build();

            var serviceProvider = webHost.Services.CreateScope().ServiceProvider;
            var identitySeeder = new Seeder(
                serviceProvider.GetService<UserManager<ApplicationUser>>(), 
                serviceProvider.GetService<RoleManager<IdentityRole<long>>>(), 
                serviceProvider.GetService<IdentityContext>());

            identitySeeder.Seed().Wait();
            MovieSeeder.Seed(serviceProvider.GetService<MovieDbContext>());    

            webHost.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
