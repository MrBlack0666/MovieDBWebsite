namespace BAS.AppServices
{
    public class RegisterResultDTO
    {
        public bool Success { get; set; }
        public bool UsernameTaken { get; set; }
        public bool EmailTaken { get; set; }
    }
}
