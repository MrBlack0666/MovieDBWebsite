using Microsoft.EntityFrameworkCore;

namespace BAS.Database
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {

        }

        public DbSet<Personnel> Actors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MoviePersonnel> MoviePersonnel { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Review>().HasKey(r => new
            {
                r.UserId,
                r.MovieId
            });

            builder.Entity<MoviePersonnel>().HasKey(r => new
            {
                r.MovieId,
                r.PersonId,
                r.MemberPosition
            });

            builder.Entity<MovieGenre>().HasKey(r => new
            {
                r.MovieId,
                r.GenreId
            });

            builder.Entity<Movie>().HasIndex(m => m.Title).IsUnique();
        }
    }
}
