using BAS.AppServices;
using Microsoft.AspNetCore.Hosting;

namespace BAS.Projekt.Services
{
    public class WebAppContext : IAppContext
    {
        private readonly IWebHostEnvironment hostingEnvironment;

        public WebAppContext(IWebHostEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public string ServableContentPath => this.hostingEnvironment.WebRootPath;
    }
}
