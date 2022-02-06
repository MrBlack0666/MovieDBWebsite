using BAS.Database;
using System;
using System.Threading.Tasks;

namespace BAS.Repository.Infrastructure.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public IGenericRepository<Genre> GenreRepository { get; }
        public IGenericRepository<Movie> MovieRepository { get; }
        public IGenericRepository<MovieGenre> MovieGenreRepository { get; }
        public IGenericRepository<MoviePersonnel> MoviePersonnelRepository { get; }
        public IGenericRepository<Personnel> PersonnelRepository { get; }
        public IGenericRepository<Review> ReviewRepository { get; }
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
