using BAS.AppCommon;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BAS.Database
{
    public class Movie
    {
        public long Id { get; set; }
        [MaxLength(StaticValues.MoviePosterMaxLength)]
        public string Poster { get; set; }
        [MaxLength(StaticValues.MovieTitleMaxLength)]
        [Required]
        public string Title { get; set; }
        [MaxLength(StaticValues.MovieDescriptionMaxLength)]
        public string Description { get; set; }
        [Required]
        public int ReleaseYear { get; set; }
        [Required]
        public int MovieLengthInMinutes { get; set; }
        public double AverageRating { get; set; }

        public virtual List<MoviePersonnel> Crew { get; set; }
        public virtual List<MovieGenre> Genres { get; set; }
        public virtual List<Review> Reviews { get; set; }

    }
}
