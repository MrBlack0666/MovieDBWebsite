using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public interface IFileService
    {
        void DeleteMoviePoster(string posterName);
        Task<string> InsertMoviePoster(long movieId, IFormFile file);
        Task<string> UpdateMoviePoster(long movieId, string posterName, IFormFile file);
        FileDTO GetMoviePoster(string posterName);
    }
}