namespace BAS.AppServices
{
    public class UserReviewInListDTO
    {
        public long UserId { get; set; }
        public long MovieId { get; set; }
        public string Username { get; set; }
        public string MovieTitle { get; set; }
        public double Rating { get; set; }
        public string Message { get; set; }
    }
}
