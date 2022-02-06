using BAS.AppCommon;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BAS.Identity
{
    public class Seeder
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole<long>> roleManager;
        private readonly IdentityContext identityContext;

        public Seeder(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<long>> roleManager, IdentityContext identityContext)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.identityContext = identityContext;
        }

        public async Task Seed()
        {
            identityContext.Database.Migrate();

            using(var transaction = await identityContext.Database.BeginTransactionAsync())
            {
                if(!identityContext.Roles.Any())
                {
                    await roleManager.CreateAsync(new IdentityRole<long>(UserRole.Admin.ToString()));
                    await roleManager.CreateAsync(new IdentityRole<long>(UserRole.User.ToString()));
                }

                if(!identityContext.Users.Any())
                {
                    var user1 = new ApplicationUser()
                    {
                        Name = "Administrator",
                        Surname = "Administrator",
                        Email = "nie@tup.ru",
                        EmailConfirmed = true,
                        UserName = "Admin",
                        SecurityStamp = Guid.NewGuid().ToString()
                    };

                    var user2 = new ApplicationUser()
                    {
                        Name = "Adam",
                        Surname = "Nietupski",
                        Email = "nietup@beton.pl",
                        EmailConfirmed = true,
                        UserName = "Nietup",
                        SecurityStamp = Guid.NewGuid().ToString()
                    };

                    var user3 = new ApplicationUser()
                    {
                        Name = "Pan",
                        Surname = "Czarny",
                        Email = "pan@czarny.pl",
                        EmailConfirmed = true,
                        UserName = "MrBlack",
                        SecurityStamp = Guid.NewGuid().ToString()
                    };

                    var user4 = new ApplicationUser()
                    {
                        Name = "Mefju",
                        Surname = "Es",
                        Email = "mef@ju.pl",
                        EmailConfirmed = true,
                        UserName = "Mefju",
                        SecurityStamp = Guid.NewGuid().ToString()
                    };

                    var user5 = new ApplicationUser()
                    {
                        Name = "Roman",
                        Surname = "Dmowski",
                        Email = "roman@dmowski.pl",
                        EmailConfirmed = true,
                        UserName = "Romulus",
                        SecurityStamp = Guid.NewGuid().ToString()
                    };

                    var user6 = new ApplicationUser()
                    {
                        Name = "Testowy",
                        Surname = "Testowy",
                        Email = "Testowy@Testowy.pl",
                        EmailConfirmed = true,
                        UserName = "Testowy",
                        SecurityStamp = Guid.NewGuid().ToString()
                    };

                    await userManager.CreateAsync(user1, "admin123");
                    await userManager.AddToRoleAsync(user1, UserRole.Admin.ToString());

                    await userManager.CreateAsync(user2, "nietup123");
                    await userManager.AddToRoleAsync(user2, UserRole.User.ToString());

                    await userManager.CreateAsync(user3, "nietup123");
                    await userManager.AddToRoleAsync(user3, UserRole.User.ToString());

                    await userManager.CreateAsync(user4, "nietup123");
                    await userManager.AddToRoleAsync(user4, UserRole.User.ToString());

                    await userManager.CreateAsync(user5, "nietup123");
                    await userManager.AddToRoleAsync(user5, UserRole.User.ToString());

                    await userManager.CreateAsync(user6, "nietup123");
                    await userManager.AddToRoleAsync(user6, UserRole.User.ToString());
                }

                transaction.Commit();
            }
        }
    }
}
