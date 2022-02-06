using BAS.AppServices;

namespace BAS.Tests.Services
{
    public class TestsAppContext : IAppContext
    {
        public string ServableContentPath => "Content";
    }
}
