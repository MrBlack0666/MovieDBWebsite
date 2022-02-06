using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using BAS.AppServices;
using BAS.Services.Notification;

namespace BAS.Projekt.Services
{
    public class UrlHelper : BAS.Services.IUrlHelper
    {
        private readonly IUrlHelper urlHelper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly AppConfig appConfig;

        public UrlHelper(IUrlHelper urlHelper, IHttpContextAccessor httpContextAccessor, AppConfig appConfig)
        {
            this.urlHelper = urlHelper;
            this.httpContextAccessor = httpContextAccessor;
            this.appConfig = appConfig;
        }

        public string CreateClientUrl(RegistrationConfirmNotificationArgs args)
        {
            string url = appConfig.Host.FrontURL + "/activate?userId=" + args.UserAccountId + "&token=" + args.Token;

            return url;
        }
    }
}
