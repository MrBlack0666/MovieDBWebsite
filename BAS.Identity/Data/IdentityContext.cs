using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BAS.Identity
{
    public class IdentityContext : IdentityDbContext<ApplicationUser, IdentityRole<long>, long>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .Property(p => p.Name)
                .IsRequired();

            builder.Entity<ApplicationUser>()
                .Property(p => p.Surname)
                .IsRequired();
        }
    }
}
