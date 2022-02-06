using System.Collections.Generic;

namespace BAS.AppServices
{
    public class GetMovieDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ReleaseYear { get; set; }
        public int MovieLengthInMinutes { get; set; }
        public double AverageRating { get; set; }
        public FileDTO MoviePoster { get; set; }
        public List<GenreInMovieDTO> Genres { get; set; }
        public List<PersonnelInMovieDTO> Personnel { get; set; }
    }
}
