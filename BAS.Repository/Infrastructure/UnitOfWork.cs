using BAS.Database;
using BAS.Repository.Infrastructure.Interfaces;
using System.Threading.Tasks;

namespace BAS.Repository.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MovieDbContext context;
        private readonly IGenericRepository<Genre> genreRepository;
        private readonly IGenericRepository<Movie> movieRepository;
        private readonly IGenericRepository<MovieGenre> movieGenreRepository;
        private readonly IGenericRepository<MoviePersonnel> moviePersonnelRepository;
        private readonly IGenericRepository<Personnel> personnelRepository;
        private readonly IGenericRepository<Review> reviewRepository;

        public UnitOfWork(MovieDbContext context)
        {
            this.context = context;
        }

        public IGenericRepository<Genre> GenreRepository => genreRepository ?? new GenericRepository<Genre>(context);

        public IGenericRepository<Movie> MovieRepository => movieRepository ?? new GenericRepository<Movie>(context);

        public IGenericRepository<MovieGenre> MovieGenreRepository => movieGenreRepository ?? new GenericRepository<MovieGenre>(context);

        public IGenericRepository<MoviePersonnel> MoviePersonnelRepository => moviePersonnelRepository ?? new GenericRepository<MoviePersonnel>(context);

        public IGenericRepository<Personnel> PersonnelRepository => personnelRepository ?? new GenericRepository<Personnel>(context);

        public IGenericRepository<Review> ReviewRepository => reviewRepository ?? new GenericRepository<Review>(context);

        public void Dispose()
        {
            if(context != null)
            {
                context.Dispose();
            }
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
