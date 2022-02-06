namespace BAS.AppServices
{
    public class LogInResult
    {
        public bool Success { get; set; }
        public bool InvalidEmailOrPassword { get; set; }
        public bool HasConfirmedEmail { get; set; }
        public string Token { get; set; }
    }
}
