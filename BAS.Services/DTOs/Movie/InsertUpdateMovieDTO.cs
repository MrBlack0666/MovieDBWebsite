using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace BAS.AppServices
{
    public class InsertUpdateMovieDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ReleaseYear { get; set; }
        public int MovieLengthInMinutes { get; set; }
        public IFormFile File { get; set; }
        public bool UpdatePhoto { get; set; }
        public List<InsertMovieCrewDTO> Crew { get; set; }
        public List<long> Genres { get; set; }
    }
}
