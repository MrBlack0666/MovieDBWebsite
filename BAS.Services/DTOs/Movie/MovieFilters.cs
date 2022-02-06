namespace BAS.AppServices
{
    public class MovieFilters : BaseFilter
    {
        public string Title { get; set; }
        public int? ReleaseYearFrom { get; set; }
        public int? ReleaseYearTo { get; set; }
        public int? MovieLengthFrom { get; set; }
        public int? MovieLengthTo { get; set; }
        public double? AvgRatingFrom { get; set; }
        public double? AvgRatingTo { get; set; }
        public long? GenreId { get; set; }
    }
}
