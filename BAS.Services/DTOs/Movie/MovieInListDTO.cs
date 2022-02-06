using System.Collections.Generic;

namespace BAS.AppServices
{
    public class MovieInListDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public int MovieLengthInMinutes { get; set; }
        public double AverageRating { get; set; }
        public FileDTO Poster { get; set; }
        public string PosterName { get; set; }
        public List<string> Genres { get; set; }
    }
}
