namespace BAS.AppServices
{
    public class AppConfig
    {
        public EmailConfig Email { get; set; }
        public JWTConfig JWTToken { get; set; }
        public APIConfig API { get; set; }
        public ConnectionStringsConfig ConnectionStrings { get; set; }
        public HostConfig Host { get; set; }
    }

    public class EmailConfig
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }

    public class JWTConfig
    {
        public string SigningKey { get; set; }
        public int ExpirationTimeMinutes { get; set; }
    }

    public class APIConfig
    {
        public MoviePyAPIConfig BasPy { get; set; }
    }

    public class MoviePyAPIConfig
    {
        public string Url { get; set; }
    }

    public class ConnectionStringsConfig
    {
        public string MovieDatabase { get; set; }
        public string Identity { get; set; }
    }

    public class HostConfig
    {
        public string Url { get; set; }
        public string FrontURL { get; set; }
    }
}
