using BAS.AppCommon;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BAS.Database
{
    public class Genre
    {
        public long Id { get; set; }
        [MaxLength(StaticValues.GenreNameMaxLength)]
        [Required]
        public string Name { get; set; }
        [MaxLength(StaticValues.GenreDescriptionMaxLength)]
        public string Description { get; set; }
        public virtual List<MovieGenre> MovieGenres { get; set; }
    }
}
