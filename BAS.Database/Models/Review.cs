using BAS.AppCommon;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAS.Database
{
    public class Review
    {
        public long UserId { get; set; }

        public long MovieId { get; set; }

        [Required]
        public double Rating { get; set; }

        [MaxLength(StaticValues.ReviewContentMaxLength)]
        public string Message { get; set; }

        [ForeignKey("MovieId")]
        public virtual Movie Movie { get; set; }
    }
}
