using System.ComponentModel.DataAnnotations.Schema;

namespace BAS.Database
{
    public class MovieGenre
    {
        public long MovieId { get; set; }
        public long GenreId { get; set; }
        [ForeignKey("MovieId")]
        public virtual Movie Movie { get; set; }
        [ForeignKey("GenreId")]
        public virtual Genre Genre { get; set; }
    }
}
